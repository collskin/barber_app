// pages/api/barbers/[barberId]/availability.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import {
  APPOINTMENT_INTERVAL_MINUTES,
  BREAK_TIMES,
  WORK_END_HOUR,
  WORK_END_MINUTE,
  WORK_START_HOUR,
  WORK_START_MINUTE,
} from "@/app/lib/constants";
import AppointmentModel from "@/app/models/Appointment";
import { dbConnect } from "@/app/lib/db";
import BarberModel from "@/app/models/Barber";

dayjs.extend(utc);
dayjs.extend(timezone);

interface AvailableSlotsResponse {
  availableSlots: string[]; // ISO strings
}

interface AvailabilityMessageResponse {
  message: string;
  available?: boolean;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AvailableSlotsResponse | AvailabilityMessageResponse>
) {
  const { method } = req;
  const { barberId } = req.query;

  if (method !== "GET") {
    return res.status(405).json({ message: `Method ${method} not allowed` });
  }

  const { date, time } = req.query; // date: 'YYYY-MM-DD', time: 'HH:MM' (optional)

  if (!date || typeof date !== "string") {
    return res.status(400).json({
      message: "Date query parameter is required in YYYY-MM-DD format.",
    });
  }

  if (time && typeof time !== "string") {
    return res.status(400).json({
      message: "Time query parameter must be a string in HH:MM format.",
    });
  }

  try {
    await dbConnect();

    // Verify barber exists
    const barber = await BarberModel.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found." });
    }

    // Define the date in UTC or your preferred timezone
    const selectedDate = dayjs.utc(date, "YYYY-MM-DD").startOf("day");

    if (!selectedDate.isValid()) {
      return res.status(400).json({ message: "Invalid date format." });
    }

    // If a specific time is provided, check availability at that time
    if (time) {
      const [hourStr, minuteStr] = time.split(":");
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);

      if (
        isNaN(hour) ||
        isNaN(minute) ||
        hour < 0 ||
        hour > 23 ||
        minute < 0 ||
        minute > 59
      ) {
        return res
          .status(400)
          .json({ message: "Invalid time format. Use HH:MM." });
      }

      const requestedTime = selectedDate
        .hour(hour)
        .minute(minute)
        .second(0)
        .millisecond(0);

      // Check if the requested time is within working hours
      const requestedHourDecimal =
        requestedTime.hour() + requestedTime.minute() / 60;

      const isWithinWorkingHours =
        requestedHourDecimal >= WORK_START_HOUR + WORK_START_MINUTE / 60 &&
        requestedHourDecimal <= WORK_END_HOUR + WORK_END_MINUTE / 60 &&
        !BREAK_TIMES.includes(requestedTime.format("HH:mm"));

      if (!isWithinWorkingHours) {
        return res.status(400).json({
          message:
            "Requested time is outside of working hours or during break.",
        });
      }

      // Check if the slot is already booked
      const appointmentExists = await AppointmentModel.findOne({
        barber: barberId,
        appointmentTime: requestedTime.toDate(),
      });

      return res.status(200).json({
        message: "Availability checked.",
        available: !appointmentExists,
      });
    }

    // Generate all possible appointment slots for the day
    const slots: Date[] = [];
    let current = selectedDate
      .hour(WORK_START_HOUR)
      .minute(WORK_START_MINUTE)
      .second(0)
      .millisecond(0);

    const end = selectedDate
      .hour(WORK_END_HOUR)
      .minute(WORK_END_MINUTE)
      .second(0)
      .millisecond(0);

    while (current.isBefore(end) || current.isSame(end)) {
      const timeStr = current.format("HH:mm");
      if (!BREAK_TIMES.includes(timeStr)) {
        slots.push(current.toDate());
      }
      current = current.add(APPOINTMENT_INTERVAL_MINUTES, "minute");
    }

    // Fetch existing appointments for the barber on the specified date
    const startOfDay = selectedDate.toDate();
    const endOfDay = selectedDate.endOf("day").toDate();

    const existingAppointments = await AppointmentModel.find({
      barber: barberId,
      appointmentTime: { $gte: startOfDay, $lte: endOfDay },
    }).select("appointmentTime -_id");

    // Extract booked times as timestamps for efficient comparison
    const bookedTimes = existingAppointments.map((app) =>
      app.appointmentTime.getTime()
    );

    // Determine available slots
    const availableSlots = slots
      .filter((slot) => !bookedTimes.includes(slot.getTime()))
      .map((slot) => slot.toISOString());

    res.status(200).json({ availableSlots });
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

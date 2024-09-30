// pages/api/barbers/[barberId]/appointments.ts
import type { NextApiRequest, NextApiResponse } from "next";
import dayjs from "dayjs";
import { dbConnect } from "@/app/lib/db";
import BarberModel from "@/app/models/Barber";
import {
  BREAK_TIMES,
  WORK_END_HOUR,
  WORK_END_MINUTE,
  WORK_START_HOUR,
  WORK_START_MINUTE,
} from "@/app/lib/constants";
import AppointmentModel from "@/app/models/Appointment";

interface BookingRequestBody {
  date: string; // 'YYYY-MM-DD'
  time: string; // 'HH:MM'
  clientName: string;
  clientEmail: string;
}

interface BookingSuccessResponse {
  message: string;
  appointment: {
    _id: string;
    barber: string;
    clientName: string;
    clientEmail: string;
    appointmentTime: string; // ISO string
    createdAt: string;
    updatedAt: string;
  };
}

interface BookingErrorResponse {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<BookingSuccessResponse | BookingErrorResponse>
) {
  const { method } = req;
  const { barberId } = req.query;

  if (method !== "POST") {
    return res.status(405).json({ message: `Method ${method} not allowed` });
  }

  const { date, time, clientName, clientEmail } =
    req.body as BookingRequestBody;

  if (!date || !time || !clientName || !clientEmail) {
    return res.status(400).json({
      message: "Date, time, clientName, and clientEmail are required.",
    });
  }

  try {
    await dbConnect();

    // Verify barber exists
    const barber = await BarberModel.findById(barberId);
    if (!barber) {
      return res.status(404).json({ message: "Barber not found." });
    }

    // Parse and validate date and time
    const selectedDate = dayjs.utc(date, "YYYY-MM-DD");
    if (!selectedDate.isValid()) {
      return res
        .status(400)
        .json({ message: "Invalid date format. Use YYYY-MM-DD." });
    }

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

    const appointmentTime = selectedDate
      .hour(hour)
      .minute(minute)
      .second(0)
      .millisecond(0);

    // Check if the requested time is within working hours
    const requestedHourDecimal =
      appointmentTime.hour() + appointmentTime.minute() / 60;

    const isWithinWorkingHours =
      requestedHourDecimal >= WORK_START_HOUR + WORK_START_MINUTE / 60 &&
      requestedHourDecimal <= WORK_END_HOUR + WORK_END_MINUTE / 60 &&
      !BREAK_TIMES.includes(appointmentTime.format("HH:mm"));

    if (!isWithinWorkingHours) {
      return res.status(400).json({
        message: "Requested time is outside of working hours or during break.",
      });
    }

    // Validate 30-minute interval
    if (minute !== 0 && minute !== 30) {
      return res.status(400).json({
        message: "Appointments can only be scheduled on the hour or half-hour.",
      });
    }

    // Check if the slot is already booked
    const existingAppointment = await AppointmentModel.findOne({
      barber: barberId,
      appointmentTime: appointmentTime.toDate(),
    });

    if (existingAppointment) {
      return res
        .status(409)
        .json({ message: "This time slot is already booked." });
    }

    // Create the appointment
    const appointment = await AppointmentModel.create({
      barber: barberId,
      clientName,
      clientEmail,
      appointmentTime: appointmentTime.toDate(),
    });

    res.status(201).json({
      message: "Appointment booked successfully.",
      appointment: {
        _id: appointment._id,
        barber: appointment.barber.toString(),
        clientName: appointment.clientName,
        clientEmail: appointment.clientEmail,
        appointmentTime: appointment.appointmentTime.toISOString(),
        createdAt: appointment.createdAt.toISOString(),
        updatedAt: appointment.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    console.error("Error booking appointment:", error);
    // Handle duplicate key error (in case of race conditions)
    if (error.code === 11000) {
      return res
        .status(409)
        .json({ message: "This time slot is already booked." });
    }
    res.status(500).json({ message: "Internal server error." });
  }
}

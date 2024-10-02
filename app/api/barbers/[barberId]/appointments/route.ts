// app/api/barbers/[barberId]/appointments/route.ts
import { NextRequest, NextResponse } from "next/server";
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

export async function POST(
  request: NextRequest,
  { params }: { params: { barberId: string } }
) {
  const { barberId } = params;

  const body: BookingRequestBody = await request.json();

  const { date, time, clientName, clientEmail } = body;

  if (!date || !time || !clientName || !clientEmail) {
    return NextResponse.json(
      { message: "Date, time, clientName, and clientEmail are required." },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    // Verify barber exists
    const barber = await BarberModel.findById(barberId);
    if (!barber) {
      return NextResponse.json({ message: "Barber not found." }, { status: 404 });
    }

    // Parse and validate date and time
    const selectedDate = dayjs.utc(date, "YYYY-MM-DD");
    if (!selectedDate.isValid()) {
      return NextResponse.json(
        { message: "Invalid date format. Use YYYY-MM-DD." },
        { status: 400 }
      );
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
      return NextResponse.json(
        { message: "Invalid time format. Use HH:MM." },
        { status: 400 }
      );
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
      return NextResponse.json(
        { message: "Requested time is outside of working hours or during break." },
        { status: 400 }
      );
    }

    // Validate 30-minute interval
    if (minute !== 0 && minute !== 30) {
      return NextResponse.json(
        { message: "Appointments can only be scheduled on the hour or half-hour." },
        { status: 400 }
      );
    }

    // Check if the slot is already booked
    const existingAppointment = await AppointmentModel.findOne({
      barber: barberId,
      appointmentTime: appointmentTime.toDate(),
    });

    if (existingAppointment) {
      return NextResponse.json(
        { message: "This time slot is already booked." },
        { status: 409 }
      );
    }

    // Create the appointment
    const appointment = await AppointmentModel.create({
      barber: barberId,
      clientName,
      clientEmail,
      appointmentTime: appointmentTime.toDate(),
    });

    return NextResponse.json(
      {
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
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error booking appointment:", error);
    // Handle duplicate key error (in case of race conditions)
    if (error.code === 11000) {
      return NextResponse.json(
        { message: "This time slot is already booked." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { message: "Internal server error ju ju." },
      { status: 500 }
    );
  }
}

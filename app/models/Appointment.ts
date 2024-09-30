// models/Appointment.ts
import mongoose, { Schema, model, Document } from "mongoose";

interface Appointment extends Document {
  barber: mongoose.Types.ObjectId;
  clientName: string;
  clientEmail: string;
  appointmentTime: Date;
}

const AppointmentSchema: Schema = new Schema(
  {
    barber: {
      type: mongoose.Types.ObjectId,
      ref: "Barber",
      required: true,
    },
    clientName: {
      type: String,
      required: true,
      trim: true,
    },
    clientEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    appointmentTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Ensure a barber cannot have two appointments at the same time
AppointmentSchema.index({ barber: 1, appointmentTime: 1 }, { unique: true });

const AppointmentModel =
  mongoose.models.Appointment ||
  model<Appointment>("Appointment", AppointmentSchema);
export default AppointmentModel;

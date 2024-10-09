// models/Barber.ts
import mongoose, { Schema, model, Document } from "mongoose";

export interface Barber extends Document {
  barberName:string
clientName:string
clientPhone:string
date:Date
time:string
services:number[]
confirmed:boolean
  // Add other relevant fields if necessary
}

const BarberSchema: Schema = new Schema(
  {
    barberName: { type: String, required: true },
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    services: { type: [Number], required: true },
    confirmed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const BarberModel =
  mongoose.models.Barber || model<Barber>("Barber", BarberSchema);
export default BarberModel;

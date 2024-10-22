// models/Barber.ts
import mongoose, { Schema, model, Document } from "mongoose";
import { IServiceResponse } from "../admin/types";

export interface Barber extends Document {
  barberName:string
clientName:string
clientPhone:string
clientEmail:string
date:Date
time:string[]
services:string[]
confirmed:boolean
  // Add other relevant fields if necessary
}

export interface IBarberWithServicesObject extends Barber{
  servicesDetails:IServiceResponse[]
}

const BarberSchema: Schema = new Schema(
  {
    barberName: { type: String, required: true },
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    clientEmail: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: [String], required: true },
    services: { type: [String], required: true },
    confirmed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const BarberModel =
  mongoose.models.Barber || model<Barber>("Barber", BarberSchema);
export default BarberModel;

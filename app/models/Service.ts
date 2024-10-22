// models/Barber.ts
import mongoose, { Schema, model, Document } from "mongoose";

export interface Service extends Document {
 name:string
 price:number
 slots:number
}

const ServiceSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    slots: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const ServiceModel =
  mongoose.models.Service || model<Service>("Service", ServiceSchema);
export default ServiceModel;

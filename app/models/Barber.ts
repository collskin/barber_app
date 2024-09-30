// models/Barber.ts
import mongoose, { Schema, model, Document } from "mongoose";

interface Barber extends Document {
  name: string;
  // Add other relevant fields if necessary
}

const BarberSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // Add other fields here
  },
  {
    timestamps: true,
  }
);

const BarberModel =
  mongoose.models.Barber || model<Barber>("Barber", BarberSchema);
export default BarberModel;

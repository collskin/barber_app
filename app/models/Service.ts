import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number, // Alternatively, you can use Number if you want to do calculations
    required: true,
  },
});

export default mongoose.models.Service ||
  mongoose.model("Service", ServiceSchema);

import mongoose, { Schema } from "mongoose";
import { driveModelName, userModelName } from "../constants";

export const BookingSchema: Schema = new mongoose.Schema({
  createdAt: { type: Date, required: true, default: new Date() },
  driverId: {
    type: Schema.Types.ObjectId,
    ref: driveModelName,
    required: true,
  },
  userId: { type: Schema.Types.ObjectId, ref: userModelName, required: true },
  fare: { type: Number },
  source: { latitude: { type: Number }, longitude: { type: Number } },
  destination: { latitude: { type: Number }, longitude: { type: Number } },
  modeOfPayment: { type: String, required: false },
  completed: { type: Boolean, required: true },
  driverRating: { type: Number, required: false },
  userRating: { type: Number, required: true },
});

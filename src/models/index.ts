import Mongoose from "mongoose";
import { bookingModelName, driveModelName, userModelName } from "../constants";
import { BookingInterface, DriverInterface, UserInterface } from "../interface";
import { BookingSchema } from "./BookingModel";
import { DriverSchema } from "./DriverModel";
import { UserSchema } from "./UserModel";

export function userModel(): Mongoose.Model<UserInterface> {
  return Mongoose.model<UserInterface>(userModelName, UserSchema);
}

export function driverModel(): Mongoose.Model<DriverInterface> {
  return Mongoose.model<DriverInterface>(driveModelName, DriverSchema);
}

export function bookingsModel(): Mongoose.Model<BookingInterface> {
  return Mongoose.model<BookingInterface>(bookingModelName, BookingSchema);
}

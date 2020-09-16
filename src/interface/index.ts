import { Schema, Document } from "mongoose";

export interface UserInterface extends Document {
  name: string;
  phoneNumber: string;
  email: string;
  createdAt: Date;
}

export interface DriverInterface extends Document {
  name: string;
  phoneNumber: string;
  address: [string];
  createdAt: Date;
  vehicleNumber: string;
  email: string;
}

export interface BookingInterface extends Document {
  createdAt: Date;
  driverId: string;
  userId: string;
  fare: number;
  source: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
  modeOfPayment: string;
  completed: boolean;
  driverRating: number;
  userRating: number;
}

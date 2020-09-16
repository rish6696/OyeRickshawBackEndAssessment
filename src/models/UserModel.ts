import mongoose, { Schema } from "mongoose";

export const UserSchema: Schema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: [{ type: String, required: true }],
  createdAt: { type: Date, required: true, default: new Date() },
});

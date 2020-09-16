import express, { Router } from "express";
import { bookingRoute } from "./booking.Router";

export const router: Router = express.Router();

router.use("/bookings", bookingRoute);

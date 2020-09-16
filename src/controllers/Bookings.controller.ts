import { Request, Response, NextFunction } from "express";
import { Types } from "mongoose";
import { userBearer } from "../constants";
import {
  INTERNAL_SERVER_ERROR,
  INVALID_BOOKING_ID,
  UNAUTHORIZED_REQUEST,
} from "../errorConstants";
import { bookingsModel } from "../models";
import { APIError } from "../utilities/APIError";

export async function ratingController(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { bookingId, bearer, rating } = req.params;

  const Booking = bookingsModel();

  let bookingObjectId;
  try {
    bookingObjectId = Types.ObjectId(bookingId);
  } catch (error) {
    return next(new APIError(406, INVALID_BOOKING_ID));
  }

  const booking = await Booking.findById(bookingObjectId);

  if (!booking) return next(new APIError(406, INVALID_BOOKING_ID));

  const bearerId =
    bearer.localeCompare(userBearer) === 0 ? "userId" : "driverId";
  const bearerRating =
    bearer.localeCompare(userBearer) === 0 ? "userRating" : "driverRating";

  if (booking[bearerId].toString().localeCompare(req.userId) !== 0)
    return next(new APIError(400, UNAUTHORIZED_REQUEST));

  try {
    let updateObject: any = {};
    updateObject[bearerRating] = rating;

    const result = await Booking.updateOne(
      { _id: Types.ObjectId(bookingId) },
      { ...updateObject }
    );
    res.json({ status: true, result });
  } catch (error) {
    next(new APIError(500, INTERNAL_SERVER_ERROR));
  }
}

export async function getAggregateRating(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { bearer } = req.params;
  const bearerId =
    bearer.localeCompare(userBearer) === 0 ? "userId" : "driverId";

  const bearerRating =
    bearer.localeCompare(userBearer) === 0 ? "userRating" : "driverRating";

  let matchObject: any = {};
  matchObject[bearerId] = Types.ObjectId(req.userId);

  const Booking = bookingsModel();

  const [data] = await Booking.aggregate<{ averageRating: number }>([
    { $match: matchObject },
    { $group: { _id: null, averageRating: { $avg: `$${bearerRating}` } } },
  ]);

  res.json({ status: true, averageRating: data.averageRating });
}

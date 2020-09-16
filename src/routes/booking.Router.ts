import express, { Router } from "express";
import {
  getAggregateRating,
  ratingController,
} from "../controllers/Bookings.controller";
import { createValidator, ExpressJoiInstance } from "express-joi-validation";

import {
  authTokenHeaderValidator,
  getAggregateRatingParamsValidator,
  ratingValidatorParams,
} from "../validators/Booking.validator";
import { verifyJwtToken } from "../middlewares";

const validator: ExpressJoiInstance = createValidator({});

export const bookingRoute: Router = express.Router();

bookingRoute
  .route("/rating/:bearer/:bookingId/:rating")
  .post(
    validator.headers(authTokenHeaderValidator),
    validator.params(ratingValidatorParams),
    verifyJwtToken,
    ratingController
  );

bookingRoute
  .route("/rating/:bearer")
  .get(
    validator.headers(authTokenHeaderValidator),
    validator.params(getAggregateRatingParamsValidator),
    verifyJwtToken,
    getAggregateRating
  );

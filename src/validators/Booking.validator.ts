import Joi, { ObjectSchema } from "@hapi/joi";
import {
  driverBearer,
  maximumRating,
  minimumRating,
  userBearer,
} from "../constants";

export const ratingValidatorParams: ObjectSchema = Joi.object({
  bookingId: Joi.string().required(),
  bearer: Joi.string().allow(userBearer, driverBearer).required(),
  rating: Joi.number().min(minimumRating).max(maximumRating),
});

export const authTokenHeaderValidator: ObjectSchema = Joi.object({
  authorization: Joi.string().required(),
});

export const getAggregateRatingParamsValidator: ObjectSchema = Joi.object({
  bearer: Joi.string().allow(userBearer, driverBearer).required(),
});

import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import { jwtSecretKeyAuthToken } from "../config";
import { UNAUTHORIZED_REQUEST } from "../errorConstants";
import { APIError } from "../utilities/APIError";

export const errorHandler = (
  error: APIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.status).send({
    error: {
      status: error.status,
      message: error.message,
    },
  });
};

export function verifyJwtToken(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const { authorization } = req.headers as { authorization: string };
  try {
    const verified = JWT.verify(authorization, jwtSecretKeyAuthToken) as {
      userId: string;
      iat: number;
      exp: number;
    };
    req.userId = verified.userId;
    next();
  } catch (err) {
    return next(new APIError(400, UNAUTHORIZED_REQUEST));
  }
}

import dotenv from "dotenv";
dotenv.config();

export const dbUrl = process.env.DB_URL as string;
export const env = process.env.ENVIRONMENT as string;
export const jwtSecretKeyAuthToken = process.env
  .JWT_SECRET_KEY_AUTH_TOKEN as string;

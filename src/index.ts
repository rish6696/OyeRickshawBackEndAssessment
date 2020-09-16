import express, { NextFunction, Request, Response, urlencoded } from "express";
import { router } from "./routes/index";
import mongoose from "mongoose";
import { dbUrl, env } from "./config";
import { production, development } from "./constants";
import { APIError } from "./utilities/APIError";
import { NOT_FOUND } from "./errorConstants";
import { errorHandler } from "./middlewares";

const app = express();
const PORT = process.env.PORT;

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", router);

mongoose.connect(
  dbUrl as string,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    if (env === development) console.log("MongoDb connected successfully");
  }
);

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new APIError(404, NOT_FOUND));
});

app.use(errorHandler);

app.listen(PORT, (): void => {
  if (env === development) console.log("listening' on the port", PORT);
});

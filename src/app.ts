"use strict";
// packages import
import Express, { Request, Response } from "express";
import http from "http";
import BodyParser from "body-parser";
import Compression from "compression";

// modules import
import { AuthRouter } from "./routes/index";
import HttpLogger, { logger } from "./helpers/logger.helpers";
import database from "./utils/database";
import { Env } from "./utils/env";
import { env, multiThreadingCluster } from "./helpers";
import { HttpError } from "./utils/exceptions";
import { HttpStatusCode } from "./utils/httpstatuscode";

database();
function errorHandler(err, req, res, next) {
  console.log("errorHandler", err);
  res.status(err.status || 500).send(err.message);
}
const app = Express();

process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});

// Express Plugins
app.use(Compression());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(HttpLogger);
app.use(errorHandler);
// Error handler A: Express Error middleware
app.use(function (err, req, res, next) {
  console.log("**************************");
  console.log("* [Error middleware]: err:", err);
  console.log("**************************");
  next(err);
});
// Error handler B: Node's uncaughtException handler
process.on("uncaughtException", function (err) {
  console.log("**************************");
  console.log("* [process.on(uncaughtException)]: err:", err);
  console.log("**************************");
});
// Router
app.use("/auth", AuthRouter);
app.get("/", (req, res, next) => {
  throw new HttpError(
    "na",
    HttpStatusCode.BAD_GATEWAY,
    "this is description",
    false
  );
});

app.use((err, req: Request, res: Response, next) => {
  console.log("*** logErrors:", err.message);
  //mongoDal.log(err.message, err);
  res.status(err.httpCode).json({
    code: err.httpCode,
    data: {},
    message: err.message,
    errors: err,
  });
});

//function logErrors (err: Error, req: Request, res: Response, next: NextFunction) {

// cluster cpu processingF
multiThreadingCluster(
  async () =>
    await app.listen(Env?.PORT, () => console.log(`PORT ${Env?.PORT}`)),
  false
);

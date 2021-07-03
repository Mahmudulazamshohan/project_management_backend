"use strict";
// packages import
import Express, { NextFunction, Request, Response } from "express";
import BodyParser from "body-parser";
import Compression from "compression";
import swaggerUi from "swagger-ui-express";

// modules import
import { AuthRouter } from "./routes/index";
import HttpLogger, { logger } from "./helpers/logger.helpers";
import database from "./utils/database";
import { Env } from "./utils/env";
import App from "./app";

import appConfig from "./configs/app";

import swaggerDocument from "./swagger.json";

import {
  redBgCmd,
  blueCmd,
  debugPrint,
  env,
  multiThreadingCluster,
  redCmd,
} from "./helpers";

import { HttpError } from "./utils/exceptions";
import { HttpStatusCode } from "./utils/httpstatuscode";
import PostsController from "./controllers/post.controller";
database();

function errorHandler(err, req, res, next) {
  console.log("errorHandler", err);
  res.status(err.status || 500).send(err.message);
}
const app = new App([new PostsController()], Env?.PORT, []);

app.listen();

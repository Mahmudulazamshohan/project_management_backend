// packages import
import Express from "express";
import BodyParser from "body-parser";
import Compression from "compression";

// modules import
import { AuthRouter } from "./routes/index";
import HttpLogger, { logger } from "./helpers/logger.helpers";
import database from "./utils/database";
import { Env } from "./utils/env";
database();

const app = Express();
// Express Plugins
app.use(Compression());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(BodyParser.json());
app.use(HttpLogger);

// Router
app.use("/auth", AuthRouter);
app.get("/", (req, res, next) => {
  
  try {
    throw new Error("Error happpeds");
  } catch (e) {
    next(e);
  }
});
process.on("uncaughtException", (err) => {
  console.log("uncaughtException", err);
});

app.listen(Env?.PORT, () => console.log(`PORT ${Env?.PORT}`));

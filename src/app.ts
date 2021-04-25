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
    logger.info('Found %s at %s', 'error', new Date());
    logger.info('Found %s at %s', 'error', new Error('chill winston'));
    logger.info('Found %s at %s', 'error', /WUT/);
    logger.info('Found %s at %s', 'error', true);
    logger.info('Found %s at %s', 'error', 100.00);
    logger.info('Found %s at %s', 'error', ['1, 2, 3']);
  try {
    throw new Error("Error happped");
  } catch (e) {
    next(e);
  }
});

app.listen(Env?.PORT, () => console.log(`PORT ${Env?.PORT}`));

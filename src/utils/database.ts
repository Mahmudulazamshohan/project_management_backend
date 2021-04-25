import Mongoose from "mongoose";
import { debugPrint, mongodbURLParse } from "../helpers";
import database from "../configs/database";
export default async () => {
  return await Mongoose.connect(
    mongodbURLParse(database.mongodb),
    database.mongodb.options
  ).then(() => debugPrint(`Mongodb connection at ${database.mongodb.port}`));
};

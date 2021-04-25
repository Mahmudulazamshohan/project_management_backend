import Bluebird from "bluebird";
import fs from "fs";
export const FileSystem = Bluebird.promisifyAll(fs);

import process from "process";
import { Env } from "../utils/env";
import os from "os";
import cluster from "cluster";
import dotenv, { DotenvParseOptions } from "dotenv";
import chalk from "chalk";
export const debugPrint =
  process.env.NODE_ENV === "development" ? console.log : () => {};
//
interface IUrlFormat {
  host: string;
  port: number | string;
  database: string;
  options: object;
}
export const mongodbURLParse = (uri: IUrlFormat) => {
  return `mongodb://${uri.host}:${uri.port}/${uri.database}`;
};
export const env = <G>(name: G | string, optional?: any) => {
  const v: any = dotenv.config().parsed;
  if (name && Env) {
    return v[name];
  } else {
    throw new Error("Env variable not found");
  }
};
export const multiThreadingCluster = (
  callback: Function,
  isLogEnable?: boolean
) => {
  const cpus = os.cpus();
  const numberOfCpus = cpus.length;

  if (cluster.isMaster) {
    // Fork workers.
    Array.from(Array(numberOfCpus)).forEach((cpu) => {
      cluster.fork();
    });

    cluster.on("online", () => {
      isLogEnable && console.log(`Worker in process : ${process.pid}`);
    });
    cluster.on("message", console.log);
    cluster.on("exit", (worker, code, signal) => {
      isLogEnable &&
        console.log(`Process worker ${worker.process.pid} died`, code, signal);
    });
  } else {
    // Child process
    callback();
  }
};

export const blueCmd = (...args: string[]) => {
  return chalk.blue(args);
};
export const yellowCmd = (...args: string[]) => {
  return chalk.yellow(args);
};
export const greenUnderlineCmd = (...args: string[]) => {
  return chalk.green.underline(args);
};


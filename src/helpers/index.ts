import process from "process";
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

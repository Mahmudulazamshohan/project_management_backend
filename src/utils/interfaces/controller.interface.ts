import express from "express";
export interface IController {
  index?: () => void;
  update?: () => void;
  destory?: () => void;
  show?: () => void;
}

export interface ControllerInterface {
  path: string;
  router: express.Router;
  intializeRoutes: () => void;
}

import express from "express";

class App {
  public app: express.Application;
  public port: number;
  private middlewares: Array<any>;

  constructor(controllers, port, middlewares) {
    this.app = express();
    this.port = port;
    this.middlewares = middlewares;
    //init controllers and middleware
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
  }

  private initializeMiddlewares() {
    this.middlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private initializeControllers(controllers) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  public listen() {
    console.log("port");
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
export default App;

import * as express from "express";
import { ControllerInterface } from "src/utils/interfaces/controller.interface";

class PostsController implements ControllerInterface {
  path = "/posts";
  router = express.Router();

  private posts: any = [
    {
      author: "Marcin",
      content: "Dolor sit amet",
      title: "Lorem Ipsum",
    },
  ];

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getAllPosts);
    this.router.post(this.path, this.createAPost);
  }

  getAllPosts = (
    request: express.Request,
    response: express.Response
  ) => {
    response.json(this.posts);
  };

  createAPost = (
    request: express.Request,
    response: express.Response
  ) => {
    const post: any = request.body;
    this.posts.push(post);
    response.send(post);
  };
}

export default PostsController;

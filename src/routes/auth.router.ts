import { Router, Response, Request } from "express";
import fs from "fs";
import path from "path";

import { AuthMiddleware } from "./../middlewares/auth.middleware";
import JsonWebToken from "jsonwebtoken";

const router = Router();

router.get("/login", (req: Request, res: Response) => {
  const { email, password } = req.query;
  let key = fs.readFileSync(path.join(__dirname, "../../private.key"));

  if (email && password) {
    var token = JsonWebToken.sign(
      {
        email,
        password,
      },
      key,
      {
        algorithm: "RS256",
        expiresIn: "1m",
      }
    );
    console.log(JsonWebToken.verify(token,key))
    res.json({
      status: 200,
      data: {
        token,
      },
    });
  } else {
    res.status(400).json({ message: "Unauthorized" });
  }
});
router.get("/verify", AuthMiddleware, (req: Request, res: Response) => {
  var { token } = req.query;

  var data = JsonWebToken.verify(String(token).toString(), "somesecret");
  res.json({
    data,
  });
});
export const AuthRouter = router;

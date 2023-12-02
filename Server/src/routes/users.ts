import { Router, Request, Response, NextFunction } from "express";
import { IUser, UserModel } from "../models/users";
import { UserErrors } from "../errors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

// the register api
router.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await UserModel.findOne({ username });

    if (user) {
      res.status(400).json({ type: UserErrors.USERNAME_ALREADY_EXISTS });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new UserModel({ username, password: hashedPassword });
      await newUser.save();
      res.json({ message: "User Registered Successfully" });
    }
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

// post login api
router.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const user: IUser = await UserModel.findOne({ username });
    if (!user) {
      return res.status(400).json({ type: UserErrors.NO_USER_FOUND });
    } else {
      // Checking if the password matches with the actual password of the user
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        res.status(400).json({ type: UserErrors.WRONG_CREDENTIALS });
      } else {
        // Creating a token for user and returning the users ID
        const token = jwt.sign({ id: user._id }, "secret");
        res.json({ token, userID: user._id });
      }
    }
  } catch (err) {
    res.status(500).json({ type: err });
  }
});

// middleware to verify user token
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    jwt.verify(authHeader, "secret", (err: any) => {
      if (err) {
        return res.sendStatus(403);
      } else {
        next();
      }
    });
  } else {
    return res.sendStatus(401);
  }
};
export { router as userRouter };

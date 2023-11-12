import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/users";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

mongoose.connect(
  "mongodb+srv://coderiger:Tomiwa218.@ecommerce.bos75eh.mongodb.net/"
);

app.listen(3001, () => {
  console.log("Server is running on port 3001✅");
});

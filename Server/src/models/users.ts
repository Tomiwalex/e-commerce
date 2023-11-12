import { Schema, model } from "mongoose";

export interface IUser {
  _id?: string;
  username: string;
  password: string;
  availableBalance: number;
  // purchasedItems: string[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  availableBalance: { type: Number, default: 5000 },
});

export const UserModel = model<IUser>("user", UserSchema);

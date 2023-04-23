import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  isAdmin: string;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

export default model<IUser>("User", UserSchema);
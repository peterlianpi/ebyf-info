import { model, Schema, models } from "mongoose";

const UserInfoSchema = new Schema(
  {
    email: { type: String },
    image: { type: String },
    name: { type: String },
    phone: { type: String },
    role: { type: String },
    veng: { type: String },
    fb: { type: String },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserInfo = models?.UserInfo || model("UserInfo", UserInfoSchema);

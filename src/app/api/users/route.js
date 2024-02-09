import { UserInfo } from "@/app/models/UserInfo";
import { mongoose } from "mongoose";

export async function GET() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    const userInfo = await UserInfo.find().lean();

    return Response.json(userInfo);
  } catch (error) {
    console.error("Error fetching users :", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

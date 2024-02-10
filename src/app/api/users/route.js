import { mongooseConnect } from "@/app/libs/mongoose";
import { UserInfo } from "@/app/models/UserInfo";

export async function GET() {
  try {
    await mongooseConnect();
    const userInfo = await UserInfo.find().lean();

    return Response.json(userInfo);
  } catch (error) {
    console.error("Error fetching users :", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

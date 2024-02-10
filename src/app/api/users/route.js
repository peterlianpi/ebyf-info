import { mongooseConnect } from "@/app/libs/mongoose";
import { UserInfo } from "@/app/models/UserInfo";
export const dynamic = "force-dynamic"; // defaults to auto

export async function GET() {
  try {
    await mongooseConnect();

    return Response.json(await UserInfo.find().lean());
  } catch (error) {
    console.error("Error fetching users :", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

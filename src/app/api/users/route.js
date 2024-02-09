import { UserInfo } from "@/app/models/UserInfo";
import { mongoose } from "mongoose";

export async function GET() {
  try {
    // Conect to the MongoDB database
    await mongoose.connect(process.env.MONGO_URL);

    // Fetch the user information from the database
    const userInfo = await UserInfo.find().lean();

    // Close the user information from the database
    await mongoose.connection.close();

    return Response.json(userInfo);
  } catch (error) {
    console.error("Error fetching users :", error);
    return Response.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

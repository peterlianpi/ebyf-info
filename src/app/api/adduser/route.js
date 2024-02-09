import mongoose from "mongoose";
import { UserInfo } from "@/app/models/UserInfo";

export async function POST(req) {
  try {
    mongoose.connect(process.env.MONGO_URL);

    // Extract user information from the request body
    const data = await req.json();
    const name = data.name;

    // Check if the username already exists
    const existingUser = await UserInfo.findOne({ name });
    if (existingUser) {
      return Response.json({ error: "Name Already exists" }, { status: 400 });
    }

    // Create a new UserInfo document with the provided data
    await UserInfo.create(data);

    return Response.json(data);
  } catch (error) {
    console.error("Error saving user information:", error);
    return Response.json(
      { error: "Failed to save user information" },
      { status: 500 }
    );
  }
}

import { mongooseConnect } from "@/app/libs/mongoose";
import { UserInfo } from "@/app/models/UserInfo";

// Set dynamic to "force-dynamic" to ensure server-side rendering (SSR) for this route
export const dynamic = "force-dynamic";

// Function to connect to the database
async function connectToDatabase() {
  await mongooseConnect();
}

// Function to handle errors consistently
function handleError(error, errorMessage, statusCode = 500) {
  console.error(errorMessage, error);
  return Response.json({ error: errorMessage }, { status: statusCode });
}

// GET function to fetch user information
export async function GET() {
  try {
    await connectToDatabase();

    const users = await UserInfo.find().lean();
    return Response.json(users);
  } catch (error) {
    return handleError(error, "Error fetching users");
  }
}

// POST function to create a new user
export async function POST(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const name = data.name;
    const existingUser = await UserInfo.findOne({ name });
    if (existingUser) {
      return Response.json({ error: "Name already exists" }, { status: 400 });
    }
    const userDoc = await UserInfo.create(data);
    return Response.json(userDoc);
  } catch (error) {
    return handleError(error, "Error saving user information");
  }
}

// PUT function to update user information
export async function PUT(req) {
  try {
    await connectToDatabase();
    const data = await req.json();
    const _id = data._id;
    await UserInfo.findOneAndUpdate({ _id }, data);
    return Response.json(true);
  } catch (error) {
    return handleError(error, "Error updating user information");
  }
}

// Delete function to delete user information
export async function DELETE(req) {
  try {
    if (req.query?.id) {
      await UserInfo.deleteOne({ _id: req.query?.id });
      return Response.json(true);
    }
  } catch (error) {
    return handleError(error, "Error updating user information");
  }
}

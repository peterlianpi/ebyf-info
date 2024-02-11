// import { mongooseConnect } from "@/app/libs/mongoose";
// import { UserInfo } from "@/app/models/UserInfo";

// // Set dynamic to "force-dynamic" to ensure server-side rendering (SSR) for this route
// export const dynamic = "force-dynamic";

// // Function to connect to the database
// async function connectToDatabase() {
//   await mongooseConnect();
// }

// // Function to handle errors consistently
// function handleError(error, errorMessage, statusCode = 500) {
//   console.error(errorMessage, error);
//   return Response.json({ error: errorMessage }, { status: statusCode });
// }

// // GET function to fetch user information
// export async function GET() {
//   try {
//     await connectToDatabase();

//     const users = await UserInfo.find().lean();
//     return Response.json(users);
//   } catch (error) {
//     return handleError(error, "Error fetching users");
//   }
// }

// // POST function to create a new user
// export async function POST(req) {
//   try {
//     await connectToDatabase();
//     const data = await req.json();
//     const name = data.name;
//     const existingUser = await UserInfo.findOne({ name });
//     if (existingUser) {
//       return Response.json({ error: "Name already exists" }, { status: 400 });
//     }
//     const userDoc = await UserInfo.create(data);
//     return Response.json(userDoc);
//   } catch (error) {
//     return handleError(error, "Error saving user information");
//   }
// }

// // PUT function to update user information
// export async function PUT(req) {
//   try {
//     await connectToDatabase();
//     const data = await req.json();
//     const _id = data._id;
//     await UserInfo.findOneAndUpdate({ _id }, data);
//     return Response.json(true);
//   } catch (error) {
//     return handleError(error, "Error updating user information");
//   }
// }

// // Delete function to delete user information
// export async function DELETE(req) {
//   try {
//     const id = await req.json();
//     await connectToDatabase();
//     await UserInfo.deleteOne({ _id: id });

//     return Response.json(true);
//   } catch (error) {
//     return handleError(error, "Error deleting user information");
//   }
// }

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

// Function to set CORS headers
function setCORSHeaders(response) {
  response.headers.set(
    "Access-Control-Allow-Origin",
    "https://ebyf-info.vercel.app"
  );
  response.headers.set(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE"
  );
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );
}

// GET function to fetch user information
export async function GET() {
  try {
    await connectToDatabase();

    const users = await UserInfo.find().lean();
    const response = Response.json(users);
    setCORSHeaders(response);
    return response;
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
    const response = Response.json(userDoc);
    setCORSHeaders(response);
    return response;
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
    const response = Response.json(true);
    setCORSHeaders(response);
    return response;
  } catch (error) {
    return handleError(error, "Error updating user information");
  }
}

// Delete function to delete user information
export async function DELETE(req) {
  try {
    const id = await req.json();
    await connectToDatabase();
    await UserInfo.deleteOne({ _id: id });

    const response = Response.json(true);
    setCORSHeaders(response);
    return response;
  } catch (error) {
    return handleError(error, "Error deleting user information");
  }
}

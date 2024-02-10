import { User } from "@/app/models/User";
import { mongooseConnect } from "@/app/libs/mongoose";

export async function POST(req) {
  await mongooseConnect();
  const body = await req.json();
  const pass = body.password;
  if (!pass?.length || pass.length < 5) {
    throw new Error("password must be at least 5 characters");
  }
  const notHashedPassword = pass;
  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(notHashedPassword, salt);

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { User } from "@/app/models/User";
import bcrypt from "bcrypt";
import GoogleProvider from "next-auth/providers/google";
import { mongooseConnect } from "@/app/libs/mongoose";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;

          // Check if email and password are provided
          if (!email || !password) {
            return null;
          }

          await mongooseConnect();
          const user = await User.findOne({ email });
          const passwordOk =
            user && bcrypt.compareSync(password, user.password);

          // If user not found or password doesn't match,return null
          if (!user || !passwordOk) {
            return null;
          }
          return { id: user._id, name: user.name, email: user.email };
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET, // Your secure signing key
    encryption: true, // Enable token encryption
    encryptionKey: process.env.JWT_ENCRYPTION_KEY, // Your encryption key
    signingKey: process.env.JWT_SIGNING_KEY, // Your signing key (optional)
    encryptionAlgorithm: "HS512", // Encryption algorithm
    tokenMaxAge: "1d", // Maximum token age
  },
  callbacks: {
    // signIn, session callbacks
  },
  pages: {
    signIn: "/login", // Custom signIn page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

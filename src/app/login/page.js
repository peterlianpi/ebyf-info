"use client";

import { useState } from "react";
import Image from "next/image/";
import Link from "next/link/";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginInProgress, setLoginInProgress] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setLoginInProgress(true);
    await signIn("credentials", { email, password, callbackUrl: "/" });
    setLoginInProgress(false);
  }

  return (
    <section className="mt-8">
      <h1 className="mb-4 text-4xl text-center text-primary">Login</h1>
      <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          name="email"
          type="text"
          placeholder="email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          disabled={loginInProgress}
        />
        <input
          name="password"
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          disabled={loginInProgress}
        />
        <Button className="w-[100%]" type="submit" disabled={loginInProgress}>
          Login
        </Button>
        <div className="my-4 text-center text-gray-500">
          or login with provider
        </div>
        <Button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          className="flex justify-center gap-4 w-[100%]"
        >
          <Image src={"/google.png"} alt={""} width={"24"} height={"24"} />
          Login with Google
        </Button>

        <div className="pt-4 my-4 text-center text-gray-500 border-t">
          New account?{" "}
          <Link className="underline" href={"/register"}>
            Register here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
export default LoginPage;

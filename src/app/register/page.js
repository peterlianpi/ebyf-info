"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);

    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }

  return (
    <section className="mt-8">
      <h1 className="mb-4 text-4xl text-center text-primary">Register</h1>
      {userCreated && (
        <div className="my-4 text-center">
          User created. <br /> Now you can{" "}
          <Link className="underline" href="/login">
            Login &raquo;
          </Link>
        </div>
      )}
      {error && (
        <div className="my-4 text-center">
          An error has occurred. <br />
          Please try again later
        </div>
      )}
      <form className="block max-w-xs mx-auto" onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          required
          disabled={creatingUser}
        />
        <input
          type="text"
          placeholder="username or email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          required
          disabled={creatingUser}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          required
          disabled={creatingUser}
        />
        <Button className="w-[100%]" type="submit" disabled={creatingUser}>
          Register
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
          Existing account?{" "}
          <Link className="underline" href={"/login"}>
            Login here &raquo;
          </Link>
        </div>
      </form>
    </section>
  );
}
export default RegisterPage;

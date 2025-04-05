"use client";
//makes this component part of client (frontend)

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const [loading, setLoading] = React.useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("signup success", response.data);
      router.push("/login");
    } catch (error: unknown) {
      
      //this log will be on browser
      if (axios.isAxiosError(error)) {
        console.log("signup failed", error.message);
        toast.error(error.message);
      } else {
        console.log("unexpected error", error);
      }
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing" : "signup"}</h1>
      <hr />
      <label htmlFor="username">username</label>
      <input
        type="text"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white bg-gray-800"
        id="username"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })} //change on username. nothing else
        placeholder="username"
      />

      <label htmlFor="email">email</label>
      <input
        type="text"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white bg-gray-800"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })} //change on email. nothing else
        placeholder="email"
      />

      <label htmlFor="password">password</label>
      <input
        type="password"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white bg-gray-800"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })} //change on password. nothing else
        placeholder="password"
      />

      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white bg-gray-800"
        onClick={onSignUp}
      >
        {buttonDisabled ? "no signup" : "signup"}
      </button>

      <Link href="/login">Visit Login Page</Link>
    </div>
  );
}

"use client";
//makes this component part of client (frontend)

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response);

      toast.success("login successful");
      router.push("/profile");
    } catch (error: any) {
      console.log("login failed", error.messgae);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "processing" : "login"}</h1>
      <hr />

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
        type="text"
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white bg-gray-800"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })} //change on password. nothing else
        placeholder="password"
      />

      <button
        className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white bg-gray-800"
        onClick={onLogin}
      >
        {buttonDisabled ? "no login" : "login"}
      </button>

      <Link href="/signup">Visit SignUp Page</Link>
    </div>
  );
}

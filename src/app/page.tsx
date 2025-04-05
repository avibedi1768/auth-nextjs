"use client";

import Link from "next/link";
import React from "react";
// import { sendEmail } from "@/helpers/mailer";

export default function Home() {
  // const [email, setEmail] = React.useState("");

  // const send = async () => {
  //   await sendEmail({ email, emailType: "RESET", emailId: email });
  // };

  return (
    <div className="p-10">
      <h1 className="text-3xl">Hello! welcome to the authorization app</h1>
      <br />
      <br />

      <h2 className="text-xl">visit the links:</h2>

      <div className="flex gap-10 underline text-gray-400">
        <Link
          href="/signup"
          className="hover:text-purple-500 ease-in-out duration-200"
        >
          Signup
        </Link>
        <Link
          href="/login"
          className="hover:text-purple-500 ease-in-out duration-200"
        >
          Login
        </Link>
        <Link
          href="/profile"
          className="hover:text-purple-500 ease-in-out duration-200"
        >
          Profile
        </Link>
        <Link
          href="/changepass"
          className="hover:text-purple-500 ease-in-out duration-200"
        >
          Forgot Password
        </Link>
      </div>

      <br />
      <br />
      <p>
        <b>Note:</b> you need to be logged in to visit profile page!!
      </p>
      <br />
      <br />

      {/* <div className="flex flex-col justify-center gap-2 w-sm">
        <h1 className="text-2xl">Forgot password? Want to reset it?</h1>
        <label>Enter email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-amber-50 text-black outline-0 p-2 rounded-md"
        />
        <button
          className="bg-violet-500 text-white p-2 rounded-md"
          onClick={send}
        >
          Submit
        </button>
      </div> */}
    </div>
  );
}

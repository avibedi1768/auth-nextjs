"use client";

import React from "react";
import axios from "axios";

export default function ChangePasswordPage() {
  const [email, setEmail] = React.useState("");
  const [emailSent, setEmailSent] = React.useState(false);

  const send = async () => {
    try {
      await axios.post("/api/users/changepass", { email });
      setEmailSent(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) console.log(error.response?.data);
      else console.log("unexpected error", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-screen h-screen">
      <div className="flex flex-col justify-center gap-2 border rounded-md p-10">
        <h1 className="text-2xl">Forgot password? Want to reset it?</h1>
        <label>Enter email</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-amber-50 text-black outline-0 p-2 rounded-md"
        />
        <button
          className="cursor:pointer bg-violet-500 hover:bg-violet-700   text-white p-2 rounded-md"
          onClick={send}
        >
          Submit
        </button>
      </div>

      {emailSent && <div>Email sent to {email}</div>}
    </div>
  );
}

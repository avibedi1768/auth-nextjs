"use client";
// opens through mail

import axios from "axios";
import Link from "next/link";
import React from "react";

export default function ForgotPasswordPage() {
  const [token, setToken] = React.useState("");
  const [error, setError] = React.useState(false);
  const [updated, setUpdated] = React.useState(false);
  const [showLimit, setShowLimit] = React.useState(false);
  const [pass, setPass] = React.useState("");
  const [confirmPass, setConfirmPass] = React.useState("");

  const resetPassword = async () => {
    if (pass != confirmPass) {
      alert("passwords do not match");
      return;
    }

    try {
      console.log(token, pass);

      await axios.post("/api/users/forgotpass", { token, pass });
      setUpdated(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  React.useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  React.useEffect(() => {
    if (pass.length < 6 || confirmPass.length < 6) {
      setShowLimit(true);
    } else {
      setShowLimit(false);
    }
  }, [pass, confirmPass]);

  return (
    <div className="min-h-screen w-screen flex items-center justify-center flex-col gap-10">
      <div className="flex justify-center flex-col gap-5 border rounded-md p-10">
        <h1 className="text-2xl">Forgot Password? No worries</h1>
        {/* <h2>Enter the new password</h2> */}

        <label>Enter password</label>
        <input
          type="text"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          className="bg-amber-50 text-black outline-0 p-2 rounded-md"
        />
        <label>Confirm password</label>
        <input
          type="text"
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          className="bg-amber-50 text-black outline-0 p-2 rounded-md"
        />

        <h1>{showLimit ? "Password should be more than 8 characters" : ""}</h1>

        <button
          onClick={resetPassword}
          className="bg-blue-500 hover:bg-blue-700 cursor-pointer ease-in-out duration-300 p-3 rounded-md"
          disabled={showLimit}
        >
          Reset
        </button>
      </div>

      {updated && (
        <div>
          <h2 className="mb-5">Password updated</h2>
          <Link
            href="/login"
            className="text-2xl bg-blue-500 hover:bg-blue-700 p-2 ml-5 rounded-md"
          >
            Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 p-2 rounded-md">Error</h2>
        </div>
      )}
    </div>
  );
}

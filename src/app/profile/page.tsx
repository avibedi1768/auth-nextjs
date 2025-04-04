"use client";

import axios from "axios";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = React.useState("nothing");
  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout successful");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p>profile page</p>
      <h2 className="p-3 ml-2 rounded bg-violet-500 text-black">
        {data === "nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>my profile</Link>
        )}
      </h2>
      <hr />

      <button
        className="mt-4 cursor-pointer bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={logout}
      >
        logout
      </button>

      <button
        className="mt-4 cursor-pointer bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        onClick={getUserDetails}
      >
        getUserDetails
      </button>
    </div>
  );
}

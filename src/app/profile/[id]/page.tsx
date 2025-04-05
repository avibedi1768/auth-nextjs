// for profile/abc -> individual user
"use client";

import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams();

  console.log("params", params);
  console.log("id", params.id);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-4xl">
        profile page
        <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>

      {/* <div>{JSON.stringify(params)}</div> */}
    </div>
  );
}

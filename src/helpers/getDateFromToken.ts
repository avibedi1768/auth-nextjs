import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as {
      id: string;
      email: string;
    };

    return decodedToken.id;
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error("something went wrong");
  }
};

//clear out the token
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "logout successful",
      success: true,
    });

    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0), //immediately
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof Error)
      return NextResponse.json({ error: error.message }, { status: 500 });

    return NextResponse.json(
      { error: "something went wrong" },
      { status: 400 }
    );
  }
}

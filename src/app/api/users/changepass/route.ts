import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    console.log(email);

    //check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    console.log(user);
    console.log(email, user._id);

    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json({
      messsage: "password reset link sent to email",
      success: true,
      user,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 400 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, pass } = reqBody;

    console.log(reqBody);
    console.log("inside forgotpass route");

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() }, // (greater than)
    });

    if (!user) {
      return NextResponse.json({ error: "invalid token" }, { status: 400 });
    }

    console.log(user);

    const salt = await bcryptjs.genSalt(10);
    const hashedPass = await bcryptjs.hash(pass, salt);

    user.password = hashedPass;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "password changed successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

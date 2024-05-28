import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usersModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// connect to db
connect();
export const POST = async (req: NextRequest) => {
  try {
    const { token, newPassword } = await req.json();
    console.log(token);
    // hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword, salt);
    const user = await User.findOneAndUpdate(
      {
        forgotPasswordToken: token,
        forgotPasswordTokenExpiry: { $gt: Date.now() },
      },
      {
        password: hashedPassword,
      }
    );
    console.log(user);
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    // logout
    const res = NextResponse.json({
      message: "password verified",
      success: true,
    });
    res.cookies.set("token", "");
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};
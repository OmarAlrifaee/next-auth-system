import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usersModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
// connect to db
connect();
export const POST = async (req: NextRequest) => {
  try {
    const { email, password } = await req.json();
    // check if there is a user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { errro: "user does'nt exist" },
        { status: 400 }
      );
    }
    // check if password is correct
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "password is not valid" },
        { status: 400 }
      );
    }
    // create a jwt
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });
    const res = NextResponse.json({
      message: "login successfully",
      success: true,
    });
    // set the cookies
    res.cookies.set("token", token, { httpOnly: true });
    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};
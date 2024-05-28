import { connect } from "@/dbConfig/dbConfig";
import { NextResponse, type NextRequest } from "next/server";
import User from "@/models/usersModel";

connect();
export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { token } = reqBody;
    console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    console.log(user);
    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json({
      message: "email verified",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};

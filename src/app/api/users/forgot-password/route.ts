import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usersModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";
// connect to db
connect();
export const POST = async (req: NextRequest) => {
  try {
    const { email } = await req.json();
    const user = await User.findOne({ email });
    await sendEmail({
      email: user?.email,
      emailType: "RESET",
      userId: user?._id,
    });
    return NextResponse.json({
      message: "",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
};

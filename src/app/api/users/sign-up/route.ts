import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usersModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
// connect to db
connect();
export const POST = async (req: NextRequest) => {
  try {
    const { username, email, password } = await req.json();
    const user = await User.findOne({ email });
    // check if the user is already exist in the db
    if (user) {
      return NextResponse.json(
        { error: "user already exist" },
        { status: 409 }
      );
    }
    // hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    // create a new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    return NextResponse.json({
      success: true,
      message: "user created successfully",
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};

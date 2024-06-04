"use server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/usersModel";
import { sendEmail } from "@/helpers/mailer";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export const ForgotPasswordAction = async (data: FormData) => {
  // connect to db
  connect();
  try {
    const email = data.get("email");
    const user = await User.findOne({ email });
    await sendEmail({
      email: user?.email,
      emailType: "RESET",
      userId: user?._id,
    });
    console.log("user found by email");
  } catch (error: any) {
    console.log(error.message);
  }
};
export const LoginAction = async (data: FormData) => {
  // connect to db
  connect();
  try {
    const { email, password } = Object.fromEntries(data);
    // check if there is a user
    const user = await User.findOne({ email });
    if (!user.email) {
      throw new Error("user not found");
    }
    // check if password is correct
    const isPasswordValid = await bcryptjs.compare(
      password as string,
      user.password
    );
    if (!isPasswordValid) {
      throw new Error("password not valid");
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
    cookies().set("token", token, { httpOnly: true });
    console.log("login successfully");
  } catch (error: any) {
    console.log(error.message);
  }
  redirect("/profile");
};
export const LogoutAction = async () => {
  try {
    // remove the token from the cookies
    cookies().set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    console.log("logged out successfully");
  } catch (error: any) {
    console.log(error.message);
  }
  redirect("/login");
};
export const SignUpAction = async (data: FormData) => {
  connect();
  // connect to db
  try {
    const { username, email, password } = Object.fromEntries(data);
    const user = await User.findOne({ email });
    // check if the user is already exist in the db
    if (user) {
      throw new Error("user is already exist");
    }
    // hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password as string, salt);
    // create a new user
    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    // send vefrification email
    await sendEmail({
      email: savedUser?.email,
      emailType: "VERIFY",
      userId: savedUser?._id,
    });
  } catch (error: any) {
    console.log(error.message);
  }
  redirect("/login");
};
export const VerifyEmailAction = async (token: string) => {
  connect();
  try {
    console.log(token);
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });
    console.log(user);
    if (!user) {
      console.log("there is no user to verify");
    }
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    console.log("email verified");
  } catch (error: any) {
    console.log(error.message);
  }
  redirect("/login");
};
export const VerifyPasswordAction = async (data: FormData, token: string) => {
  // connect to db
  connect();
  try {
    const newPassword = data.get("password");
    console.log(token);
    // hashing the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(newPassword as string, salt);
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
      console.log("user not found");
    }
    // logout
    cookies().set("token", "");
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();
    console.log("password changed successfully");
  } catch (error: any) {
    console.log(error.message);
  }
  redirect("/login");
};

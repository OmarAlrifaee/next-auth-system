import { NextResponse } from "next/server";
export const GET = async () => {
  try {
    const res = NextResponse.json({
      message: "logged out successfully",
      success: true,
    });
    // remove the token from the cookies
    res.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res;
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message },
      {
        status: 500,
      }
    );
  }
};

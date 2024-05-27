import { type NextRequest, NextResponse } from "next/server";
import User from "@/models/usersModel";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
connect();
export const GET = async (req: NextRequest) => {
  try {
    // get the id of the user by the cookie
    const id = await getDataFromToken(req);
    // find the user in the db
    const user = await User.findById(id).select("-password");
    // return a res
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
};

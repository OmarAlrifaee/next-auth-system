import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
export const getDataFromToken = async (req: NextRequest) => {
  try {
    // get the token from the request
    const token = req.cookies.get("token")?.value;
    // decode the token to get the data from it
    const decodedToken: any = jwt.verify(token!, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

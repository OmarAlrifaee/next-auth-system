import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export const getDataFromToken = async () => {
  try {
    // get the token from the request
    const token = cookies().get("token")?.value;
    // decode the token to get the data from it
    const decodedToken: any = jwt.verify(token!, process.env.TOKEN_SECRET!);
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

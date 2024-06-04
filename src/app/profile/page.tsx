import LogoutButton from "@/components/LogoutButton";
import Link from "next/link";
import User from "@/models/usersModel";
import { connect } from "@/dbConfig/dbConfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
type UserType = {
  email: string;
  _id: string;
  username: string;
  isAdmin: boolean;
  isVerified: boolean;
};
const getUser = async () => {
  connect();
  try {
    // get the id of the user by the cookie
    const id: string = await getDataFromToken();
    // find the user in the db
    const user = await User.findById(id).select("-password");
    return user;
  } catch (error: any) {
    console.log(error.message);
  }
};
const Profile = async () => {
  const user: UserType = await getUser();
  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-6xl font-bold mb-5">
          Hello {user?.username} {user?.isVerified ? "You Are Verified" : ""}
        </h1>
        {user?.isAdmin ? <h2>You Are Admin</h2> : ""}
        <Link
          href={`/profile/${user?._id}`}
          className="bg-blue-500 px-5 py-2 text-white font-semibold rounded-md"
        >
          see Page
        </Link>
        <LogoutButton />
      </div>
    </section>
  );
};
export default Profile;

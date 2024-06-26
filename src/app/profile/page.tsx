"use client";
import axios from "axios";
import LogoutButton from "@/components/LogoutButton";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
type UserType = {
  email: string;
  _id: string;
  username: string;
  isAdmin: boolean;
  isVerified: boolean;
};
const Profile = () => {
  const [user, setUser] = useState<UserType>();
  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get("/api/users/current-user");
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, []);
  useEffect(() => {
    if (user) {
      if (!user?.isVerified) toast.error("your accunt is not verified");
      else toast.success("your email is verified");
    }
  }, [user]);
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

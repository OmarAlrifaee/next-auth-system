"use client";
import axios from "axios";
import LogoutButton from "@/components/LogoutButton";
import { useEffect, useState } from "react";
import Link from "next/link";
type UserType = {
  email: string;
  _id: string;
  username: string;
  isAdmin: boolean;
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
  return (
    <section className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-6xl font-bold mb-5">Hello {user?.username}</h1>
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

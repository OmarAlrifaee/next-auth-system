"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
const LogoutButton = () => {
  const router = useRouter();
  // functions
  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      if (res.data?.success) {
        router.replace("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={logout}
      className="bg-red-500 px-5 py-2 rounded-md text-white font-semibold"
    >
      Logout
    </button>
  );
};
export default LogoutButton;

"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const LogoutButton = () => {
  const router = useRouter();
  // functions
  const logout = async () => {
    try {
      const res = await axios.get("/api/users/logout");
      if (res.data?.success) {
        toast.success("you logged out successfully");
        setTimeout(() => {
          router.replace("/login");
        }, 2000);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wronge please try agine");
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

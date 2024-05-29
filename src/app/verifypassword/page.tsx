"use client";

import Loader from "@/components/Loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const VerifyPassword = ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/users/verifypassword", {
        token: searchParams.token,
        newPassword: password,
      });
      setSuccess(true);
      toast.success("your password have been changed successfully");
      setTimeout(() => {
        router.replace("/login");
      }, 2000);
    } catch (error) {
      setSuccess(false);
      console.log(error);
      toast.error("something went wronge please try agine");
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <form onSubmit={onSubmit} className="flex flex-col items-center gap-8">
        <h2 className="text-4xl font-bold mb-5">Enter Your New Password</h2>
        <input
          className="border px-3 py-1 focus:outline-none"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="new password"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 px-5 py-2 text-white font-bold"
          disabled={loading || success}
        >
          {loading ? <Loader /> : "Login"}
        </button>
      </form>
    </section>
  );
};
export default VerifyPassword;

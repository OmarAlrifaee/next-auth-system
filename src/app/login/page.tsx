"use client";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";
const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  // functions
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users/login", {
        email: user.email,
        password: user.password,
      });
      if (data) {
        setError(false);
        setSuccess(true);
        router.replace("/profile");
      }
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="min-h-screen flex justify-center items-center">
      <form className="flex flex-col items-center gap-8" onSubmit={onSubmit}>
        <h1 className="text-6xl font-bold mb-5">Login</h1>
        {error ? <span>something went wronge</span> : ""}
        <div className="relative">
          <label htmlFor="email" className="absolute top-[-24px]">
            email:
          </label>
          <input
            className="border px-3 py-1 focus:outline-none"
            type="email"
            id="email"
            placeholder="email"
            value={user.email}
            required
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="relative">
          <label htmlFor="email" className="absolute top-[-24px]">
            password:
          </label>
          <input
            className="border px-3 py-1 focus:outline-none"
            type="password"
            id="password"
            required
            placeholder="password"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            type="submit"
            className="bg-blue-500 px-5 py-2 text-white font-bold"
            disabled={loading || success}
          >
            {loading ? <Loader /> : "Login"}
          </button>
          <div className="flex items-center gap-10 w-full">
            <Link href={"/sign-up"} className="text-blue-500 underline">
              Signup
            </Link>
            <Link href={"/forgot-password"} className="text-blue-500 underline">
              forgot password?
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
export default Login;

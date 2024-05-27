"use client";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
const SignUp = () => {
  const [user, setUser] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  // functions
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("/api/users/sign-up", {
        username: user.username,
        email: user.email,
        password: user.password,
      });
      if (data) {
        setError(false);
        router.replace("/login");
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
      <form
        // action={onSignUpAction}
        className="flex flex-col items-center gap-8"
        onSubmit={onSubmit}
      >
        <h1 className="text-6xl font-bold">Signup</h1>
        {error ? <span>something went wronge please try agine</span> : ""}
        <div className="flex items-center gap-3 relative">
          <label htmlFor="username" className="absolute top-[-24px]">
            username:
          </label>
          <input
            className="border px-3 py-1 focus:outline-none"
            type="text"
            id="username"
            name="username"
            placeholder="username"
            required
            value={user.username}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-3  relative">
          <label htmlFor="email" className="absolute top-[-24px]">
            email:
          </label>
          <input
            className="border px-3 py-1 focus:outline-none"
            type="email"
            id="email"
            name="email"
            placeholder="email"
            required
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-3 relative">
          <label htmlFor="email" className="absolute top-[-24px]">
            password:
          </label>
          <input
            className="border px-3 py-1 focus:outline-none"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            required
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 font-bold"
          disabled={loading}
        >
          signup
        </button>
        <Link href={"/login"} className="text-blue-500 underline">
          login
        </Link>
      </form>
    </section>
  );
};
export default SignUp;

"use client";
import Loader from "@/components/Loader";
import axios from "axios";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/users/forgot-password", {
        email,
      });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="font-bold text-4xl mb-5">Forgot Your Password?</h2>
      <form onSubmit={onSubmit} className="flex flex-col items-center gap-5">
        {success ? <p>the email was sent to your account</p> : ""}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your email"
          className="border px-3 py-1 focus:outline-none"
          required
        />
        <button
          className="bg-blue-500 px-5 py-2 text-white font-bold"
          disabled={loading || success}
        >
          {loading ? <Loader /> : "Submit"}
        </button>
      </form>
    </section>
  );
};
export default ForgotPassword;

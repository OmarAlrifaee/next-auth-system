"use client";
import axios from "axios";
import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/users/forgot-password", {
        email,
      });
      setSuccess(true);
    } catch (error) {
      setSuccess(false);
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      {success ? <p>the email was sent to your account</p> : ""}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your email"
      />
      <button>Submit</button>
    </form>
  );
};
export default ForgotPassword;
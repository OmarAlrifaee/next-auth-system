"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const VerifyPassword = ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/users/verifypassword", {
        token: searchParams.token,
        newPassword: password,
      });
      setSuccess(true);
      router.replace("/login");
    } catch (error) {
      setSuccess(false);
      console.log(error);
    }
  };
  return (
    <form onSubmit={onSubmit}>
      {success ? <p>your password have been changed successfully</p> : ""}
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="new password"
      />
      <button>Submit</button>
    </form>
  );
};
export default VerifyPassword;

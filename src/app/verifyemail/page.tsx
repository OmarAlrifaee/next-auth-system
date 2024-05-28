"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const VerifyEmail = ({ searchParams }: { searchParams: { token: string } }) => {
  const router = useRouter();
  useEffect(() => {
    if (searchParams?.token) {
      (async () => {
        try {
          await axios.post("/api/users/verifyemail", {
            token: searchParams.token,
          });
          router.push("/login");
        } catch (error: any) {
          console.log(error.message);
        }
      })();
    }
  }, [searchParams, router]);
  return <div>VerifyEmail</div>;
};
export default VerifyEmail;

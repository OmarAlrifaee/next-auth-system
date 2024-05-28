"use client";

import Loader from "@/components/Loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = ({ searchParams }: { searchParams: { token: string } }) => {
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (searchParams?.token) {
      setLoading(true);
      (async () => {
        try {
          await axios.post("/api/users/verifyemail", {
            token: searchParams.token,
          });
          setSuccess(true);
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } catch (error: any) {
          setSuccess(false);
          console.log(error.message);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [searchParams, router]);
  return (
    <section className="flex flex-col gap-5 items-center justify-center">
      {loading ? <h2 className="text-4xl">Verifing...</h2> : ""}
      {success ? (
        <p className="text-green-500">Your Email Has Been Verified</p>
      ) : (
        ""
      )}
    </section>
  );
};
export default VerifyEmail;

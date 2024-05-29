"use client";

import Loader from "@/components/Loader";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

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
          toast.success("Your Email Has Been Verified");
          setTimeout(() => {
            router.push("/login");
          }, 2000);
        } catch (error: any) {
          setSuccess(false);
          console.log(error.message);
          toast.error("something went wronge please try agine");
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [searchParams, router]);
  return (
    <section className="flex flex-col gap-5 items-center justify-center">
      {loading ? <h2 className="text-4xl">Verifing...</h2> : ""}
    </section>
  );
};
export default VerifyEmail;

import { VerifyEmailAction } from "@/actions";
import { redirect } from "next/navigation";

const VerifyEmail = async ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  await VerifyEmailAction(searchParams.token);
  return (
    <section className="flex flex-col gap-5 items-center justify-center">
      <h2 className="text-4xl">Verifing...</h2>
    </section>
  );
};
export default VerifyEmail;

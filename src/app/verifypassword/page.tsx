import { VerifyPasswordAction } from "@/actions";
const VerifyPassword = ({
  searchParams,
}: {
  searchParams: { token: string };
}) => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <form
        action={async (data) => {
          "use server";
          await VerifyPasswordAction(data, searchParams.token);
        }}
        className="flex flex-col items-center gap-8"
      >
        <h2 className="text-4xl font-bold mb-5">Enter Your New Password</h2>
        <input
          className="border px-3 py-1 focus:outline-none"
          type="password"
          placeholder="new password"
          required
          name="password"
        />
        <button
          type="submit"
          className="bg-blue-500 px-5 py-2 text-white font-bold"
        >
          submit
        </button>
      </form>
    </section>
  );
};
export default VerifyPassword;

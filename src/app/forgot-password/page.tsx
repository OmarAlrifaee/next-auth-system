import { ForgotPasswordAction } from "@/actions";
const ForgotPassword = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="font-bold text-4xl mb-5">Forgot Your Password?</h2>
      <form
        action={ForgotPasswordAction}
        className="flex flex-col items-center gap-5"
      >
        <input
          type="email"
          name="email"
          placeholder="your email"
          className="border px-3 py-1 focus:outline-none"
          required
        />
        <button className="bg-blue-500 px-5 py-2 text-white font-bold">
          submit
        </button>
      </form>
    </section>
  );
};
export default ForgotPassword;

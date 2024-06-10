import { ForgotPasswordAction } from "@/actions";
import SubmitButton from "@/components/SubmitButton";
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
        <SubmitButton title="Submit" />
      </form>
    </section>
  );
};
export default ForgotPassword;

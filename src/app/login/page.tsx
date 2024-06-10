import Link from "next/link";
import { LoginAction } from "@/actions";
import SubmitButton from "@/components/SubmitButton";
const Login = () => {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <form className="flex flex-col items-center gap-8" action={LoginAction}>
        <h1 className="text-6xl font-bold mb-5">Login</h1>
        <div className="relative">
          <label htmlFor="email" className="absolute top-[-24px]">
            email:
          </label>
          <input
            className="border px-3 py-1 focus:outline-none"
            type="email"
            id="email"
            placeholder="email"
            required
            name="email"
          />
        </div>
        <div className="relative">
          <label htmlFor="email" className="absolute top-[-24px]">
            password:
          </label>
          <input
            className="border px-3 py-1 focus:outline-none"
            type="password"
            id="password"
            required
            placeholder="password"
            name="password"
          />
        </div>
        <div className="flex flex-col items-center gap-3">
          <SubmitButton title="Login" />
          <div className="flex items-center gap-10 w-full">
            <Link href={"/sign-up"} className="text-blue-500 underline">
              Signup
            </Link>
            <Link href={"/forgot-password"} className="text-blue-500 underline">
              forgot password?
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
};
export default Login;

import Link from "next/link";
import { SignUpAction } from "@/actions";
const SignUp = () => {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <form
        // action={onSignUpAction}
        className="flex flex-col items-center gap-8"
        action={SignUpAction}
      >
        <h1 className="text-6xl font-bold mb-5">Signup</h1>
        <div className="flex items-center gap-3 relative">
          <label htmlFor="username" className="absolute top-[-24px]">
            username:
          </label>
          <input
            className="border px-3 py-1 focus:outline-none"
            type="text"
            id="username"
            name="username"
            placeholder="username"
            required
          />
        </div>
        <div className="flex items-center gap-3  relative">
          <label htmlFor="email" className="absolute top-[-24px]">
            email:
          </label>
          <input
            className="border px-3 py-1 focus:outline-none"
            type="email"
            id="email"
            name="email"
            placeholder="email"
            required
          />
        </div>
        <div className="flex items-center gap-3 relative">
          <label htmlFor="email" className="absolute top-[-24px]">
            password:
          </label>
          <input
            className="border px-3 py-1 focus:outline-none"
            type="password"
            id="password"
            name="password"
            placeholder="password"
            required
          />
        </div>
        <div className="flex flex-col gap-3 items-center">
          <button
            type="submit"
            className="bg-blue-500 flex justify-center items-center text-white px-5 py-2 font-bold"
          >
            sign up
          </button>
          <Link href={"/login"} className="text-blue-500 underline">
            login
          </Link>
        </div>
      </form>
    </section>
  );
};
export default SignUp;

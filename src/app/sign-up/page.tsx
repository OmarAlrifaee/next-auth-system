import Link from "next/link";
import axios from "axios";
type User = {
  email: string;
  password: string;
  username: string;
};
const onSignUpAction = async (data: FormData) => {
  "use server";
  const { email, password, username } = Object.fromEntries(data);
};
const SignUp = () => {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <form
        action={onSignUpAction}
        className="flex flex-col items-center gap-8"
      >
        <h1 className="text-6xl font-bold">Signup</h1>
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
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-5 py-2 font-bold"
        >
          signup
        </button>
        <Link href={"/login"} className="text-blue-500 underline">
          login
        </Link>
      </form>
    </section>
  );
};
export default SignUp;

import Link from "next/link";
import axios from "axios";
type User = {
  email: string;
  password: string;
};
const onLoginAction = async (data: FormData) => {
  "use server";
  const { email, password } = Object.fromEntries(data);
  console.log(email, password);
};
const Login = () => {
  return (
    <section className="min-h-screen flex justify-center items-center">
      <form action={onLoginAction} className="flex flex-col items-center gap-8">
        <h1 className="text-6xl font-bold">Login</h1>
        <div className="relative">
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
        <div className="relative">
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
          className="bg-blue-500 px-5 py-2 text-white font-bold"
        >
          Login
        </button>
        <Link href={"/sign-up"} className="text-blue-500 underline">
          Signup
        </Link>
      </form>
    </section>
  );
};
export default Login;

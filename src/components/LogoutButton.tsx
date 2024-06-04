import { LogoutAction } from "@/actions";

const LogoutButton = () => {
  return (
    <form action={LogoutAction}>
      <button className="bg-red-500 px-5 py-2 rounded-md text-white font-semibold">
        Logout
      </button>
    </form>
  );
};
export default LogoutButton;

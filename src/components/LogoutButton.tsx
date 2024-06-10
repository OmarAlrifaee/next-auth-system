import { LogoutAction } from "@/actions";
import SubmitButton from "./SubmitButton";

const LogoutButton = () => {
  return (
    <form action={LogoutAction}>
      <SubmitButton title="Logout" />
    </form>
  );
};
export default LogoutButton;

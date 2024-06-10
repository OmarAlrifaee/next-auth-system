"use client";
import { useFormStatus } from "react-dom";
type Props = {
  title: string;
};
const SubmitButton = ({ title }: Props) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="bg-blue-500 px-5 py-2 text-white font-bold"
    >
      {pending ? "loading..." : title}
    </button>
  );
};
export default SubmitButton;

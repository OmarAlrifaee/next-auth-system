"use client";

import Link from "next/link";

type Props = {
  error: Error;
  reset: () => void;
};
const error = ({ error, reset }: Props) => {
  console.log(error?.message);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <div className="text-red-500 mb-4">
          <svg
            className="w-12 h-12 mx-auto"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 5.636l-12.728 12.728m12.728-12.728L5.636 18.364"
            ></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-600 mb-4">
          An unexpected error has occurred. Please try again later.
        </p>
        <div className="flex items-center gap-5 justify-center">
          <button
            onClick={reset}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Refresh
          </button>
          <Link
            href={"/"}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default error;

"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const SignInButton = () => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "authenticated") {
    router.push("/");
  }

  return (
    <div className="flex flex-col gap-8 items-center justify-center w-full p-5 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      {/* Form */}
      <form action="#" className="flex flex-col gap-4 w-full">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-gray-900 dark:text-gray-200">
              Full Name
            </span>
          </div>
          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-gray-900 dark:text-gray-200">
              Email
            </span>
          </div>
          <input
            type="text"
            placeholder="Email"
            className="input input-bordered w-full text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-gray-900 dark:text-gray-200">
              Enter Password
            </span>
          </div>
          <input
            type="password"
            placeholder="Enter Password"
            className="input input-bordered w-full text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text text-gray-900 dark:text-gray-200">
              Confirm Password
            </span>
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            className="input input-bordered w-full text-gray-900 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          />
        </label>
        <button className="w-full btn btn-neutral text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
          Submit
        </button>
      </form>

      {/* Sign In with Google Button */}
      <div
        onClick={() => signIn("google")}
        className="flex items-center gap-x-3 btn w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-200 border-gray-300 dark:border-gray-600"
      >
        <FcGoogle className="w-5 h-5 md:h-8 md:w-8" />
        <span>Sign In with Google</span>
      </div>
    </div>
  );
};

export default SignInButton;

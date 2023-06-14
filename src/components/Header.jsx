import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

export default function Header() {
  const router = useRouter();
  const { status } = useSession();
  const logout = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className=" 2xl:mx-auto max-w-[1400px] w-full">
      <div className="bg-white rounded shadow-lg py-5 px-7 w-full">
        <nav className="flex justify-between max-w-[1400px] w-full">
          <div className="flex items-center space-x-3 lg:pr-16 pr-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="30px"
              height="30px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            <h2 className="font-normal text-2xl leading-6 text-gray-800">
              Books
            </h2>
          </div>
          {status !== "authenticated" ? (
            <div className=" flex space-x-5 justify-center items-center pl-2 ">
              <div
                className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 flex flex-col "
                onClick={() => router.push("/login")}
              >
                <svg
                  fill="#000"
                  width="25px"
                  height="auto"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  id="login"
                >
                  <path d="M20,12a1,1,0,0,0-1-1H11.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L11.41,13H19A1,1,0,0,0,20,12ZM17,2H7A3,3,0,0,0,4,5V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V16a1,1,0,0,0-2,0v3a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V8a1,1,0,0,0,2,0V5A3,3,0,0,0,17,2Z"></path>
                </svg>
                <p className="text-xs">Login</p>
              </div>
              <div
                className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 flex flex-col items-center"
                onClick={() => router.push("/signup")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  height="auto"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#000"
                    fill-rule="evenodd"
                    d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10Zm3-12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 7a7.489 7.489 0 0 1 6-3 7.489 7.489 0 0 1 6 3 7.489 7.489 0 0 1-6 3 7.489 7.489 0 0 1-6-3Z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <p className="text-xs">Signup</p>
              </div>
            </div>
          ) : (
            <div
              className="relative cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 flex flex-col items-center"
              onClick={() => logout()}
            >
              <p>Logout</p>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
}

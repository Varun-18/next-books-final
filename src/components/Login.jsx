import { Button } from "@mui/base";
import { Toast } from "@src/constants/alerts";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import Loading from "./Loading";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const { status } = useSession();

  const router = useRouter();
  const login = async ({ email, password }) => {
    const data = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/search",
    });

    if (!data.error) {
      router.push(data.url);
    } else {
      Toast.fire({
        icon: "error",
        title: data.error,
      });
    }
  };

  if (status === "authenticated") {
    router.replace("/search");
  }

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="m-10">
      <div className="lg:w-2/6 md:w-1/2 bg-white border-2 shadow-md rounded-lg p-8 flex flex-col md:ml-auto w-full  md:mt-0 mx-auto ">
        <h2 className="text-gray-900 text-lg font-medium title-font mb-5">
          Login
        </h2>
        <form onSubmit={handleSubmit(login)}>
          <div class="relative mb-4">
            <input
              type="text"
              placeholder="email"
              label="email"
              {...register("email")}
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              label="password"
              {...register("password")}
              placeholder="password"
              className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          >
            Login
          </button>
        </form>
        <Button
          className="text-xs text-gray-500 mt-3"
          onClick={() => router.push("/signup")}
        >
          Dont have an account signup ?
        </Button>
      </div>
    </div>
  );
};

export default Login;

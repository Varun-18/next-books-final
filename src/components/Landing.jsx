import { Button } from "@mui/material";
import Link from "next/link";

export default function Landing() {
  return (
    <>
      <div className="fixed shadow-lg w-full flex justify-between p-3 text-black items-center bg-slate-100">
        <h4>google-books-app</h4>
        <div>
          <Link href={"/login"}>
            <Button sx={{ color: "#000" }}>Login</Button>
          </Link>
          <span>|</span>
          <Link href={"/signup"}>
            <Button sx={{ color: "#000" }}>signup</Button>
          </Link>
        </div>
      </div>
      <div>
        <img
          src="https://images.pexels.com/photos/7244576/pexels-photo-7244576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="w-full h-[100vh]"
        />
      </div>
    </>
  );
}

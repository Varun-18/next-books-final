import { Button, TextField } from "@mui/material";
import { addKeyword } from "@src/store/slice";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import Loading from "./Loading";

export default function Search({ name }) {
  const [search, setSearch] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  const { status } = useSession();

  const searchBook = (e) => {
    router.replace({ query: { ...router.query, name: search, pageID: 10 } });
    e.preventDefault();
    dispatch(addKeyword(search));
  };

  if (status === "unauthenticated") {
    router.push("/login");
  }

  if (status === "loading") {
    return <Loading />;
  }

  return (
    <div className="relative w-full mb-5">
      <form className="flex" onSubmit={(e) => searchBook(e)}>
        <TextField
          label="search books"
          type="text"
          variant="outlined"
          className="flex-1 "
          onChange={(event) => setSearch(event.target.value)}
        />
        <button className="border-2   px-2 bg-black  rounded-lg" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="auto"
            viewBox="0 0 53 53"
            id="search"
            fill="#fff"
          >
            <path d="M10.08 10.08a1 1 0 0 0 1.41 1.41 10.43 10.43 0 0 1 14.73 0 1 1 0 0 0 .71.3 1 1 0 0 0 .7-1.71 12.42 12.42 0 0 0-17.55 0Z"></path>
            <path d="M36.22 29.75a1 1 0 0 0-1.41 0L33 31.58l-1.89-1.9A16.35 16.35 0 0 0 7.29 7.29a16.35 16.35 0 0 0 22.39 23.8l1.9 1.9-1.83 1.82a1 1 0 0 0 0 1.41l14 14a1 1 0 0 0 1.41 0l5.06-5.06a1 1 0 0 0 0-1.41ZM8.71 29A14.35 14.35 0 0 1 29 8.71 14.35 14.35 0 0 1 8.71 29Zm35.73 19.09L31.88 35.52l3.64-3.64 12.57 12.56Z"></path>
          </svg>
        </button>
      </form>
    </div>
  );
}

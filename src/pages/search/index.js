import { BookListing } from "@src/components/BookListing";
import Loading from "@src/components/Loading";
import Pagination from "@src/components/Pagination";
import Search from "@src/components/Search";
import { client } from "@src/gql";
import { GET_ALL_BOOKS } from "@src/gql/query";
import { wrapper } from "@src/store";
import { addBooks, addKeyword } from "@src/store/slice";
import _ from "lodash";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

function SearchBar({ name, filter, books, error }) {
  const [show, setShow] = useState();
  const router = useRouter();
  const { status } = useSession();

  const applyFilter = (filter) => {
    router.push({ query: { name, pageID: 10, filter } });
    setShow(false);
  };

  const clearFilter = () => {
    router.push({ query: { name, pageID: 10 } });
    setShow(false);
  };

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    router.push("/login");
  }

  return (
    <div className="p-10">
      <Search name={name} />
      {error ? (
        <div className="font-semibold p-2">{error}</div>
      ) : (
        <div>
          <div className="flex justify-between">
            <span className="font-semibold text-sm p-2">
              {name
                ? `Showing you the results for "${name}"`
                : "You've searched no books"}
            </span>
            <div className="relative ">
              <button
                className=" border-2  rounded-md p-2 right-0 top-1"
                onClick={() => setShow(!show)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="#000"
                >
                  <path
                    fill="#000"
                    fillRule="evenodd"
                    d="M20 5h-1.17a3.001 3.001 0 0 0-5.66 0H4a1 1 0 0 0 0 2h9.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2zm-4 2a1 1 0 1 0 0-2 1 1 0 0 0 0 2zM3 12a1 1 0 0 1 1-1h1.17a3.001 3.001 0 0 1 5.66 0H20a1 1 0 1 1 0 2h-9.17a3.001 3.001 0 0 1-5.66 0H4a1 1 0 0 1-1-1zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-4 4a1 1 0 1 0 0 2h9.17a3.001 3.001 0 0 0 5.66 0H20a1 1 0 1 0 0-2h-1.17a3.001 3.001 0 0 0-5.66 0H4zm13 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
              {show ? (
                <ul className=" absolute z-10 bg-white rounded-lg right-0  border-2 px-2  ">
                  <li
                    className="w-[100px] py-2 text-center cursor-pointer"
                    onClick={() => applyFilter("paid-ebooks")}
                    value={"paid-ebooks"}
                  >
                    paid ebooks
                  </li>
                  <hr />
                  <li
                    className="w-[100px] py-2 text-center cursor-pointer"
                    onClick={() => applyFilter("free-ebooks")}
                    value={"free-ebooks"}
                  >
                    free ebooks
                  </li>
                  <hr />
                  <li
                    className="w-[100px] py-2 text-center cursor-pointer"
                    onClick={() => clearFilter()}
                  >
                    clear filter
                  </li>
                </ul>
              ) : null}
            </div>
          </div>

          {_.size(books) > 0 ? <BookListing books={books} /> : null}

          {_.size(books) > 0 ? (
            <div className="mx-auto w-fit">
              <Pagination name={name} filter={filter} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { name, pageID, filter } = context.query;

    if (!name) {
      return {
        props: {
          name: null,
          book: [],
        },
      };
    }

    try {
      const { data } = await client.query({
        query: GET_ALL_BOOKS,
        variables: {
          input: name,
          pageID: parseInt(pageID),
          filterParam: filter,
        },
      });

      console.log(data, "*** data ***");

      if (data) {
        store.dispatch(addKeyword(name));
        store.dispatch(addBooks(data.books));
      }

      if (filter) {
        return {
          props: {
            name,
            filter,
            books: data.books,
          },
        };
      }

      return {
        props: {
          name,
          books: data.books,
        },
      };
    } catch (error) {
      return {
        props: {
          error: "No books found ",
        },
      };
    }
  }
);

export default wrapper.withRedux(SearchBar);

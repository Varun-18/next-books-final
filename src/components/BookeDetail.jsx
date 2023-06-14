import { useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function BookDetail({ data }) {
  // console.log(data);
  const [show, setShow] = useState(false);
  if (data) {
    let description = data.volumeInfo.description.slice(0, 250) + "...";

    if (show) {
      description = data.volumeInfo.description;
    }
    return (
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container p-5  mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap justify-evenly ">
            <img
              alt="ecommerce"
              class="sm:w-[250px] w-[150px]  lg:h-[300px] mt-6   object-cover object-center rounded sticky top-0"
              src={data?.volumeInfo?.imageLinks?.thumbnail}
            />
            <div class="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">
                BOOK NAME
              </h2>
              <h1 class="text-gray-900 text-3xl title-font font-medium mb-1">
                {data?.volumeInfo?.title}
              </h1>
              <div class="flex mb-4">
                <span class="flex items-center">
                  <Rating
                    initialValue={data.volumeInfo.averageRating}
                    readonly={true}
                    size={18}
                    allowFraction={true}
                  />

                  <span class="text-gray-600 ml-3 my-auto">
                    {data.volumeInfo.averageRating
                      ? data.volumeInfo.averageRating
                      : "Be the first one to rate"}
                  </span>
                </span>
                <span class="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a class="text-gray-500">
                    <svg
                      fill="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <div>
                <p
                  class="leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: `${description}`,
                  }}
                />
                {show ? (
                  <button
                    onClick={() => setShow(false)}
                    className="text-blue-400"
                  >
                    show less
                  </button>
                ) : (
                  <button
                    onClick={() => setShow(true)}
                    className="text-blue-400"
                  >
                    show more
                  </button>
                )}
              </div>
              <div>
                <div className="relative overflow-x-auto my-3">
                  <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                    <tbody>
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <th
                          scope="row"
                          className="bg-gray-100 px-6 py-3 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                        >
                          Authors
                        </th>
                        <td className="px-6 py-4">
                          {data.volumeInfo?.authors?.join(" | ") || "NA"}
                        </td>
                      </tr>
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <th
                          scope="row"
                          className="bg-gray-100 px-6 py-3 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                        >
                          Published Date
                        </th>
                        <td className="px-6 py-4">
                          {data.volumeInfo?.publishedDate || "NA"}
                        </td>
                      </tr>
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <th
                          scope="row"
                          className="bg-gray-100 px-6 py-3 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                        >
                          Page Count
                        </th>
                        <td className="px-6 py-4">
                          {data.volumeInfo?.pageCount || "NA"}
                        </td>
                      </tr>
                      <tr className="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                        <th
                          scope="row"
                          className="bg-gray-100 px-6 py-3 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400"
                        >
                          Price
                        </th>
                        <td className="px-6 py-4">
                          {data.saleInfo?.retailPrice?.amount || "NA"}
                          <span>
                            {data.saleInfo?.retailPrice?.amount ? (
                              <span>
                                {data.saleInfo?.retailPrice?.amount}
                                <span className="font-semibold">INR</span>
                              </span>
                            ) : null}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    <div>Loading...</div>;
  }
}

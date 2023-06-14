import { useRouter } from "next/router";

export const BookListing = ({ books }) => {
  const router = useRouter();
  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-14 mx-auto">
        <div className="flex flex-wrap -m-4">
          {books.map((item) => (
            <div key={item.id} className="p-4 md:w-1/2 lg:w-1/3 ">
              <div className="relative h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden ">
                <div
                  className="w-fit absolute  font-bold px-1 bg-blue-700 text-white text-sm right-0 top-0"
                  style={{
                    background:
                      item.saleInfo.saleability === "NOT_FOR_SALE"
                        ? "red"
                        : "green",
                  }}
                >
                  {item.saleInfo.saleability === "FOR_SALE"
                    ? "FOR SALE"
                    : "NOT FOR SALE"}
                </div>
                <img
                  className="lg:h-[225px] md:h-[175px] sm:h-[auto] w-auto sm:w-[150px]  object-cover object-center mx-auto"
                  src={
                    item.volumeInfo?.imageLinks?.thumbnail
                      ? item.volumeInfo.imageLinks.thumbnail
                      : null
                  }
                  alt="Can't get the image"
                />
                <div className="p-6">
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    {item.volumeInfo.title.length > 20
                      ? item.volumeInfo.title.slice(0, 20) + "..."
                      : item.volumeInfo.title}
                  </h1>
                  <p
                    className="leading-relaxed mb-3"
                    dangerouslySetInnerHTML={{
                      __html:
                        item?.volumeInfo?.description?.length >= 150
                          ? item?.volumeInfo?.description.slice(0, 120) + "..."
                          : null,
                    }}
                  />
                  <div className="flex items-center flex-wrap ">
                    <button onClick={() => router.push(`/detail/${item.id}`)}>
                      <span className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">
                        Details
                        <svg
                          className="w-4 h-4 ml-2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

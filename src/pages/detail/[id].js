import { client } from "@src/gql";
import { GET_BOOK } from "@src/gql/query";

const { default: BookDetail } = require("@src/components/BookeDetail");

function detail({ data }) {
  return <BookDetail data={data} />;
}

export const getStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          id: "2TgzEAAAQBAJ",
        },
      },
    ],
    fallback: true,
  };
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const { data } = await client.query({
    query: GET_BOOK,
    variables: {
      bookId: id,
    },
  });
  return {
    props: {
      data: { ...data.book },
    },
  };
};

export default detail;

import { client } from "@src/gql";
import { GET_BOOK } from "@src/gql/query";
import BookDetail from "@src/components/BookeDetail";

function Detail({ data }) {
  return <BookDetail data={data} />;
}
export default Detail;

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

import { useQuery } from "@apollo/client";
import { Card } from "../cards/Book";
//import { GET_BOOKS } from "./graphql/queries/books";
import { InView } from "react-intersection-observer";
import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query getBooks($offset: Int, $limit: Int) {
    books(offset: $offset, limit: $limit) {
      title
      author
    }
  }
`;



export default function App() {
  const { loading, error, fetchMore, data } = useQuery(GET_BOOKS, {
    variables: { offset: 0, limit: 4 },
  });

console.log("data data",data)

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) {
    console.log(error);
  }

  if (data) {
    console.log(data.books.length);
  }


  return (
    <>
     <div>
      {data &&
        data.books.map(({ title, author }, index) => (
          <Card key={index} title={title} author={author} />
        ))}
      {data && (
        <InView
          onChange={async (inView) => {
            const currentLength = data.books.length || 0;
            if (inView) {
              await fetchMore({
                variables: {
                  offset: currentLength,
                  limit: currentLength * 2,
                },
              });
            }
          }}
        />
      )}
    </div>
    </>
  );
}

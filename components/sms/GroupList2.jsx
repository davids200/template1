import { useQuery ,gql} from '@apollo/client';
import { useState } from 'react';
//import { gql } from "@apollo/client";

const GET_BOOKS = gql`
  query GetBooks($limit: Int!, $offset: Int!) {
    books(limit: $limit, offset: $offset) {
      id
      title
      author
      totalBooks
    }
  }
`;

const PAGE_SIZE = 10;

export default function Books() {
  const [offset, setOffset] = useState(0);
  const { loading, error, data } = useQuery(GET_BOOKS, {
    variables: { limit: PAGE_SIZE, offset }
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
   
  const totalBooks=data.books[0].totalBooks;

  return (
    <div>
      <ul className='bg-gray-500 m-2 rounded-md shadow-md p-2 h-32 overflow-y-auto'>
        {data.books.map(book => (
          <li key={book.id}>
            {book.id} - {book.title} by {book.author}
          </li>
        ))}
      </ul>
      
      <div className='flex mb-5 p-2 justify-center items-center gap-2'>
      
      <button className="button text-white py-1 px-3 bg-gray-900 rounded-md"
      disabled={offset === 0} onClick={() => setOffset(offset - PAGE_SIZE)} >
         Prev
      </button>
      <button className="button text-white py-1 px-3 bg-gray-900 rounded-md"
        disabled={data.books.length < PAGE_SIZE}
        onClick={() => setOffset(offset + PAGE_SIZE)}
      >
        Next 
      </button>
      <div className='text-md text-white'>Page {(offset===0)? '1':(offset/PAGE_SIZE)+1} of { Math.round(totalBooks/PAGE_SIZE)}</div>
      </div>


    </div>
  );
}

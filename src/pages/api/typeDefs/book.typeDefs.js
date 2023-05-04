//const { gql } = require('graphql-tag');
//const { gql } = require('apollo-server-micro');
import { gql } from 'graphql-tag'
 
const bookSchema = gql`
scalar UUID
scalar DateTime
 
type Query {
  books(offset: Int, limit: Int): [Book!]
  }

  input PaginationInput {
  page: Int!
  limit: Int!
}

 type Book{
  id:Int!
  title: String!
  author: String!
  totalBooks:Int
 }

 
`;

module.exports = bookSchema;
 
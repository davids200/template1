//const { gql } = require('graphql-tag');
//const { gql } = require('apollo-server-micro');
import { gql } from 'graphql-tag'
 
const smsSchema = gql`
scalar UUID
scalar DateTime

input CreateGroupInput {
user: String!
role:String!
name: String!
country: String!
}
  
type Group{
  id:ID!
  name:String!
  country:String!
  totalGroups:Int
}
type CreateGroupResponse{
  message:String!
  created:Boolean!
}
type CreateContactResponse{
  message:String
  created:Boolean
}

type Contact {
  name: String!
  phone: String
  group:String!
}

input ContactUpload { 
  user: String!
role:String!
  name: String!
  phone: String!
  group:String!
}
input CreateContactInput { 
  user: String!
  role:String!
  name: String!
  phone: String!
  group:String!
}

 
type Query {
  books(offset: Int, limit: Int): [Book!]
  }

  input PaginationInput {
  page: Int!
  limit: Int!
}
 

  type Query {
    getAllContacts: [Contact]! 
    groups(offset: Int, limit: Int): [Group!]
    contacts(offset: Int, limit: Int): [Contact!]
  }

  type Mutation {  
  uploadGroupContacts(contacts: [ContactUpload!]!): CreateContactResponse
  createGroup(input: CreateGroupInput!): CreateGroupResponse!  
  createContact(input: CreateContactInput!): CreateContactResponse!  
  } 
`;

module.exports = smsSchema;
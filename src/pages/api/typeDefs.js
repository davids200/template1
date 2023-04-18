const { gql } = require('apollo-server-micro');

 
const typeDefs = gql`
scalar UUID
scalar DateTime


type User {
id: UUID
name: String!
email: String
photo_url:String
createdAt:DateTime
modifiedAt:DateTime
token:String
role:UserRole
  }


type UserLoginResponse{
id: UUID
name: String
email: String
photo_url:String
role:UserRole
createdAt:DateTime
modifiedAt:DateTime
token:String
error:Boolean
message:String
}

input UpdateUserInput {
name: String!
email: String!
role: String
}

type UpdateUserResponse{
id: UUID!
name: String
email: String
photo_url:String
createdAt:DateTime
modifiedAt:DateTime
role:String
}


input CreateUserInput {
id: UUID!
name: String!
email: String!
password: String!
photo_url:String
}




enum UserRole {
  USER
  ADMIN
  STAFF
}
 
  type Query {
  getUserById(id: UUID!): User
  getAllUsers: [User]! 
  }

  type Mutation {
  loginUser(email: String!, password: String!): UserLoginResponse!
  resetPassword(email: String!): Boolean
  createUser(input: CreateUserInput!): User
  uploadProfilePicture(user:String!,photo_url:String!): Boolean
  updateUser(user: UUID!, input: UpdateUserInput!): UpdateUserResponse!
  deleteUser(id: UUID!): UUID!   
  } 
`;

module.exports = typeDefs;

import { gql } from '@apollo/client';



export const GET_USERS = gql`
  query GetAllUsers {
    getAllUsers {
      id
      name
      email
      role
      photo_url
    }
  }
`;

export const GET_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    user(id: $id) {
        id
      name
      email
      role
      photo
    }
  }
`;

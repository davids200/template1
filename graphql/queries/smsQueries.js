//import { gql } from '@apollo/client';
import { gql} from '@apollo/client';



export const GET_ALL_GROUPS = gql`
  query GetGroups($limit: Int, $offset: Int) {
    groups(limit: $limit, offset: $offset) {
      id
      name
      country
      totalGroups
    }
  }
`;
 

// export const GET_ALL_CONTACTS = gql`
//   query GetContacts($limit: Int, $offset: Int) {
//     contacts(limit: $limit, offset: $offset) {
//       id
//       name
//       phone
//       totalContacts
//     }
//   }
// `;
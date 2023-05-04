import { gql } from '@apollo/client';


export const UPLOAD_GROUP_CONTACTS=gql`
 mutation UploadGroupContacts($contacts:[ContactUpload!]!) {
    uploadGroupContacts(contacts:$contacts)
  }
`;
  
export const CREATE_GROUP = gql`
mutation CreateGroup($input: CreateGroupInput!) {
  createGroup(input: $input) {
    message
    created
  }
}
`;

export const CREATE_CONTACT = gql`
mutation CreateContact($input: CreateContactInput!) {
  createContact(input: $input) {
    message
    created
  }
}
`;


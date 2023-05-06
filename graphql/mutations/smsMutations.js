import { gql } from '@apollo/client';


export const UPLOAD_GROUP_CONTACTS=gql`
 mutation UploadGroupContacts($contacts:[ContactUpload!]!) {
    uploadGroupContacts(contacts:$contacts) {
    message
    created
  }
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


export const SEND_GROUP_LISTS=gql`
 mutation SendGroupLists($input:[String!]!,$user:String!,$role:String!) {
  sendGroupLists(input:$input,user:$user,role:$role) {
    message
    created
  }
  }
`;

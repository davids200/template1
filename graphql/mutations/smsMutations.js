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


export const SEND_SMS=gql`
 mutation SendSMS($numbers:[String!],$country:String,$method:String!,$message:String!,$senderId:String!,$scheduledTime:DateTime,$user:String!,$role:String!) {
  sendSMS(numbers:$numbers,country:$country,method:$method,message:$message,senderId:$senderId,scheduledTime:$scheduledTime,user:$user,role:$role) {
    message
    created
    sent
    cost
  }
  }
`;

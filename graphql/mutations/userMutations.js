import { gql } from '@apollo/client';


export const UPLOAD_PROFILE_PICTURE=gql`
 mutation UploadProfilePicture($user:String!,$photo_url: String!) {
    uploadProfilePicture(user:$user,photo_url: $photo_url)
  }
`
export const SAVE_FORM = gql`
mutation SaveForm($input: SaveFormInput!) {
  saveForm(input: $input) {
    id
  }
}
`;

export const SEND_PASSWORD_RESET_LINK = gql`
  mutation SendPasswordResetLink($email: String!) {
    sendPasswordResetLink(email: $email) {
      success
      message
    }
  }
`;
 
export const RESET_PASSWORD = gql`
  mutation ResetMyPassword($email: String!) {
    resetMyPassword(email: $email)
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($user: UUID!, $input: UpdateUserInput!) {
    updateUser(user: $user, input: $input) {
    id 
    name 
    email 
    photo_url 
    createdAt 
    modifiedAt 
    role
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: Int!) {
    deleteUser(id: $id) {
      id
      name
      email
      role
      photo
    }
  }
`;

export const UPLOAD_PROFILE_PHOTO = gql`
  mutation UploadProfilePhoto($file: Upload!) {
    uploadProfilePhoto(file: $file) {
      url
    }
  }
`;
 
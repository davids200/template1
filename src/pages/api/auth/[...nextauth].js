import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
import TwitterProvider from "next-auth/providers/twitter";
import { createApolloClient,hashPassword } from './auth'
import { useSelector, useDispatch } from 'react-redux';
////////////////////////////////////////////////////////////
const bcrypt = require('bcrypt');
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  gql,
} from '@apollo/client' 
/////////////////////////////////////////////////////////////

export default NextAuth({
  session: {
   jwt:true
 },
    providers : [       
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
              }), 
        
 
CredentialsProvider({
name: "credentials",
 
authorize: async (res,req) => {
  const { email,password } = req.body
  
  const client = new ApolloClient({
    uri: 'http://localhost:3000/api/graphql',
    cache: new InMemoryCache(),
  })
// const saltRounds = 10; 
// const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); 

const LOGIN_USER = gql`
mutation LogInInUser($email:String!,$password:String!){
loginUser(email:$email,  password:$password) {
  token
  id
  email
  name
  photo_url
  error
  message
  role
}
}
` 
try {
const { data } = await client.mutate({
mutation: LOGIN_USER,
variables: { email, password },
})
return data
}
catch (err) {  
  throw new Error(err.message); 
}
}
})
    ],
secret: process.env.NEXTAUTH_SECRET,
callbacks: {
  async signIn({ user, account, profile, email, credentials }) {
    const isAllowedToSignIn = true
    if (isAllowedToSignIn) {
     
      return true
    } else {
      // Return false to display a default error message
      return false 
    }
  },
  jwt: async ({ token, user, account, profile, isNewUser }) => {
    user && (token.user = user)
    if(profile) 
     token.profile=profile
     if(user) 
     token.user=user
     if(isNewUser) 
     token.isNewUser=isNewUser
     if(account) 
     token.account=account
    
    return token
},
session: async ({ session, token }) => {
    session.token = token
    return session
}

  }
}) 
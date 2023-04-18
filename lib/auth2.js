import { getSession ,useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { setIsAuthenticated, setAuthUser } from '../redux/reducers/authReducer';

function checkAuth({session,dispatch}){


let token="";
let email;
let first_name;
let last_name;
let picture;
  
 let provider=session?.token.account?.provider
 const defaultImage="/assets/user.png"
 

if(session){
switch(provider){
case "twitter":{
email=(session.token?.user?.email)
first_name=(session.token?.user?.name)
last_name(session.token?.user?.name)
if(session.token?.picture)
picture=(session.token?.picture)
else
picture=(defaultImage)  
token=(session?.token?.account?.oauth_token)
setUser(email,first_name,last_name,picture,token)
break;
}

case "google":{
email=(session.token?.user?.email)
first_name=(session?.token?.profile?.given_name)
last_name=(session?.token?.profile?.family_name)
if(session.token?.picture)
picture=(session.token?.picture)
else
picture=(defaultImage)
token=(session?.token?.account?.access_token)
setUser(email,first_name,last_name,picture,token)
break;
}

case "github":{
email=(session.token?.user?.email)
 first_name=(session.token?.user?.name)
 last_name=(session.token?.user?.name)
  if(session.token?.picture)
picture=(session.token?.user?.image)
else
picture=(defaultImage)
token=(session?.token?.account?.access_token)
setUser(email,first_name,last_name,picture,token)
  break;
}
case "credentials":{
email=(session?.token?.user?.data?.login?.email)
first_name=(session?.token?.user?.data?.login?.name)
last_name=(session?.token?.user?.data?.login?.name)
if(session?.token?.user?.data?.login?.picture)
picture=(session?.token?.user?.data?.login?.picture)
else
picture=(defaultImage)
token=(session?.token?.user?.data?.login?.token)
setUser(email,first_name,last_name,picture,token)
  break;
}
}
}

} 

function setUser(email,first_name,last_name,picture,token){  
let user;
user={
  email:email,
  first_name,
  last_name,
  picture,
  token,
}
console.log("ggggggggggg",user)
dispatch(setAuthUser(user))
dispatch(setIsAuthenticated(true))
}
module.exports={checkAuth}
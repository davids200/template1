import { createSlice } from "@reduxjs/toolkit";
import { useRouter } from "next/router"; 


const initialState = {
  isAuthenticated: false,
  user: {},
}

const userSlice = createSlice({
name: 'user',
initialState,
reducers: {
setUser: (state, action) => {
try{
state.user = action.payload
state.isAuthenticated = true
}catch(err){

}
},
updateProfilePicture: (state, action) => { 
 
  try{
state.photo_url=action.payload
state.isAuthenticated = true 
  }catch(err){
  
  }
  },

updateUserDetails: (state, action) => { 
 
  try{
const t=state.token
const e=state.email
state.user = action.payload 
state.isAuthenticated = true
state.token=t
state.email=e
  }catch(err){
  
  }
  },

logOut: (state,action) => {
 
try{
state.user = null
state.isAuthenticated = false

}catch(err){
console.log("err in user slice",err.message)
}

}
  }
})

export const {setUser, updateUserDetails,updateProfilePicture,logOut} = userSlice.actions
export default userSlice.reducer
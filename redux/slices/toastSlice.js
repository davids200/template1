import { createSlice } from '@reduxjs/toolkit'
import { toast } from "react-toastify";

const initialState = {
 message: "default toast message",
 type:null,
 autoClose:3000
}


export const toastSlice = createSlice({
name: 'toast',
initialState,
reducers: {

   
toastSuccess: (state,action) => { 
toast.dismiss()
if(state.message)
toast(action.payload, { hideProgressBar: false, autoClose: state.autoClose, type: 'success' })
},

toastError: (state,action) => { 
toast.dismiss()
if(state.message)
toast(action.payload, { hideProgressBar: false, autoClose:state.autoClose, type: 'error' })
},

toastWarning: (state,action) => { 
toast.dismiss()
if(state.message)
toast(action.payload, { hideProgressBar: false, autoClose: state.autoClose, type: 'warning' })
},
   
  },
})

export const { 
    toastError, 
    toastSuccess,
    toastWarning
 } = toastSlice.actions

export default toastSlice.reducer
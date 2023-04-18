import { configureStore,getDefaultMiddleware } from "@reduxjs/toolkit";

// import thunkMiddleware from 'redux-thunk';
// import cookieParser from 'cookie-parser';
// import { authMiddleware } from './auth';
// import { createWrapper } from 'next-redux-wrapper';
import userReducer from "./slices/userSlice";
import toastReducer from "./slices/toastSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

//import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
}



const authReducer = persistReducer(persistConfig, userReducer)
//const middleware = [...getDefaultMiddleware(), thunkMiddleware, cookieParser()];

export const store = configureStore({
  reducer: {
    toast:toastReducer,
    user:authReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }), 
  devTools: process.env.NODE_ENV !== 'production', 
})

 
export const persistor = persistStore((store))

 //////////////////////////////////////////////////////////////

// import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
//import thunkMiddleware from 'redux-thunk';
//import cookieParser from 'cookie-parser';
//import { createWrapper } from 'next-redux-wrapper';
//import authReducer from './auth';

//const middleware = [...getDefaultMiddleware(), thunkMiddleware, cookieParser()];

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
//   middleware,
// });

// const makeStore = () => store;

// export const wrapper = createWrapper(makeStore);

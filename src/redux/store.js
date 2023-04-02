import { configureStore } from "@reduxjs/toolkit"
import addUserReducer from "./adduser/addUserSlice"



export const store = configureStore({
  reducer: {
    addUser: addUserReducer,
  },
})
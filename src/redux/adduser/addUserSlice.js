import { createSlice } from '@reduxjs/toolkit'
let storedData = localStorage.getItem('users');
let initialState = {
  users: storedData ? JSON.parse(storedData) : [
    {
      id: 1,
      username: 'admin',
      email: 'admin@example.com',
      password: '12345',
      mobile: '1234567890',
      json: '{"aura": "global"}',
    }
  ]
};

const addUserSlice = createSlice({
  name: 'addUsers',
  initialState,
  reducers: {
   addUser:(state,{payload})=>{
    state.users.push(payload)
    localStorage.setItem('users',JSON.stringify(state.users))
   }
  },
})


// state
export const userState = state => state.addUsers;
// action
export const {addUser} = addUserSlice.actions;

// reducer
export default addUserSlice.reducer;

// export const { addUser } = addUserSlice.actions

// export default addUserSlice.reducer
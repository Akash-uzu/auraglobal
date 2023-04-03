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
    addUser: (state, { payload }) => {
      // Add an id to the new user
      const newUser = { ...payload };
      
      // Add the new user to the users array 
      state.users.push(newUser);
      
      // Update the local storage
      localStorage.setItem('users', JSON.stringify(state.users));
    },
    updateUser: (state, { payload }) => {
      state.users.forEach(item => {
        
        if (item.id === payload.id) {
          item.username = payload.username;
          item.email = payload.email;
          item.password = payload.password;
          item.mobile = payload.mobile;
          item.json = payload.json;
        }
      });
      
      // Update the local storage
      localStorage.setItem('users', JSON.stringify(state.users));
    },
  },
});



// state
export const userState = state => state.addUsers;
// action
export const {addUser,updateUser} = addUserSlice.actions;

// reducer
export default addUserSlice.reducer;


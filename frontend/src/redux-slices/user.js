import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  id: null,
  role: null,
  email: null,
  firstName: null,
  lastName: null,
  avatarUrl: null,
  isLoggedIn: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setUser: (state, action) => {
      const {
        id,
        role,
        email,
      } = action.payload;

      state.isLoggedIn = true;

      state.id = id;
      state.role = role;
      state.email = email;
    },

    logoutUser: (state) => {

      window.localStorage.removeItem('user');
      
      state.isLoggedIn = false;

      state.id = null;
      state.role = null;
      state.email = null;

    }

  },

});

const { actions, reducer } = userSlice;

export const { 
  setUser,
  logoutUser,
} = actions;

export default reducer;
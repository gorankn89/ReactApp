import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
  register() {},
  login() {},
  logout() {},
  getActiveUser() {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem('token'),
    activeUser: null,
    error:null
  },
  reducers: {
    setActiveUser(state, action) {
      state.activeUser = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
        setErrorAuth(state, action) {
      state.error = action.payload;
    },
    ...middlewareActions,
  },
});

export const {
  register,
  login,
  logout,
  getActiveUser,
  setActiveUser,
  setToken,
  setErrorAuth
} = authSlice.actions;
export default authSlice.reducer;
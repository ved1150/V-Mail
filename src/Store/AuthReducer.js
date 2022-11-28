import { createSlice } from "@reduxjs/toolkit";

const authData = {
  token: null,
  islogin: false,
  forgotPassword: false,
  loginEmail : null 
};

const authSlice = createSlice({
  name: "auth",
  initialState: authData,
  reducers: {
    login(state, action) {
      state.token = action.payload;
      state.islogin = true;
     
    },
    logout(state, action) {
      state.token = null;
      state.islogin = false;
      
    },
    forgot(state) {
      state.forgotPassword = !state.forgotPassword;
    },
    setLoginEmail(state , action){
      state.loginEmail = action.payload
     
    }
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;

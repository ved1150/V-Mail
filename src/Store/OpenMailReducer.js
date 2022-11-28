import { createSlice } from "@reduxjs/toolkit";

const openMailData = {
  openMailValue: null,
  readMail : false
};

const openMailSlice = createSlice({
  name: "openMail",
  initialState: openMailData,
  reducers: {
    updateopenMailValue(state, action) {
      state.openMailValue = action.payload;
      state.readMail = true
    } ,
    emptyMailValue(state){
        state.openMailValue = null
    }
  },
  
});

export const openMailActions = openMailSlice.actions;
export default openMailSlice.reducer;  

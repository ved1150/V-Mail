import { createSlice } from "@reduxjs/toolkit";

const composeData = {
  list: [],
  email : null 
};

const composeSlice = createSlice({
  name: "compose",
  initialState: composeData,
  reducers: {
    updateList(state, action) {
      state.list = action.payload;
    },
    setEmail(state , action){
       state.email = action.payload
    },  
  },
  
});

export const composeActions = composeSlice.actions;
export default composeSlice.reducer;  

import { createSlice } from "@reduxjs/toolkit";

const PopData = {
  open : false ,
  item : null
};

const PopSlice = createSlice({
  name: "Pop",
  initialState: PopData,
  reducers: {
   isOpen(state ,action){
    state.open = !state.open
    state.item = action.payload
   }
  },
  
});

export const PopActions = PopSlice.actions;
export default PopSlice.reducer;  
import { createSlice } from "@reduxjs/toolkit";

const inboxData = {
  inboxList: [],
 
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState: inboxData,
  reducers: {
    updateInboxList(state, action) {
      state.inboxList = action.payload;
    }
  },
  
});

export const inboxActions = inboxSlice.actions;
export default inboxSlice.reducer;  

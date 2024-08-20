import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
  email: "",
  roleNames: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfile: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.roleNames = action.payload.roleNames;
    },
  },
});

export const { addProfile } = profileSlice.actions;

export default profileSlice.reducer;

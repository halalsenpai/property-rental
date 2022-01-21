import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";

import { getUserInfo } from "./thunk";

const thunks = [getUserInfo];

const initialState = {
  status: "idle",
  authSuccess: null,
  userInfo: null,
};

export const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.status = "idle";
        state.authSuccess = true;
        state.userInfo = action.payload;
      })
      .addMatcher(isPending(...thunks), (state) => {
        state.status = "loading";
      })
      .addMatcher(isRejected(...thunks), (state) => {
        state.status = "failed";
        state.authSuccess = false;
        state.profile = null;
      });
  },
});

export const selectStatus = (state) => state.auth.status === "loading";
export const selectAuthSuccess = (state) => state.auth.authSuccess;
export const selectUserInfo = (state) => state.auth.userInfo;

export default slice.reducer;

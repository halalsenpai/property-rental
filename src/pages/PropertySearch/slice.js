import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getPropertyTypes } from "./thunk";

const thunks = [getPropertyTypes];

const initialState = {
  status: "idle",
  propertyTypes: [],
};

export const slice = createSlice({
  name: "propertySearch",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPropertyTypes.fulfilled, (state, action) => {
        state.status = "idle";
        state.propertyTypes = action.payload;
      })
      .addMatcher(isPending(...thunks), (state) => {
        state.status = "loading";
      })
      .addMatcher(isRejected(...thunks), (state) => {
        state.status = "failed";
      });
  },
});

export const selectStatus = (state) => state.propertySearch.status === "loading";
export const selectPropertyTypes = (state) => state.propertySearch.propertyTypes;

export default slice.reducer;

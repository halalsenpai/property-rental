import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getKeywordsRulesList, getProperties, getPropertyTypes } from "./thunk";

const thunks = [getPropertyTypes, getProperties, getKeywordsRulesList];

const initialState = {
  status: "idle",
  propertyTypes: [],
  properties: [],
  keywordsRulesList: [],
  streetViewCords: null,
  sortBy: null,
};

export const slice = createSlice({
  name: "propertySearch",
  initialState,
  reducers: {
    openStreetView(state, action) {
      // ✅ This "mutating" code is okay inside of createSlice!
      state.streetViewCords = action.payload;
    },
    sortBy(state, action) {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPropertyTypes.fulfilled, (state, action) => {
        state.status = "idle";
        state.propertyTypes = action.payload;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.status = "idle";
        state.properties = action.payload;
      })
      .addCase(getKeywordsRulesList.fulfilled, (state, action) => {
        state.status = "idle";
        state.keywordsRulesList = action.payload;
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
export const selectProperties = (state) => state.propertySearch.properties;
export const selectKeywordsRulesList = (state) => state.propertySearch.keywordsRulesList;
export const selectStreetViewCords = (state) => state.propertySearch.streetViewCords;
export const selectSortBy = (state) => state.propertySearch.sortBy;

export const { openStreetView, sortBy } = slice.actions;

export default slice.reducer;

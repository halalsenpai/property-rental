import { createSlice, isPending, isRejected } from "@reduxjs/toolkit";
import { getKeywordsRulesList, getLandBounds, getProperties, getPropertyTypes } from "./thunk";

const thunks = [getPropertyTypes, getKeywordsRulesList, getLandBounds, getProperties];

const initialState = {
  status: "idle",
  propertyTypes: [],
  properties: [],
  keywordsRulesList: [],
  streetViewCords: null,
  sortBy: null,
  landBounds: [],
  propLoading: false,
  propertiesMeta: null,
  mapInstance: null,
  favoriteProperties: [],
  selectedCardRef: null,
  error: null,
};

export const slice = createSlice({
  name: "propertySearch",
  initialState,
  reducers: {
    openStreetView(state, action) {
      state.streetViewCords = action.payload;
    },
    sortBy(state, action) {
      state.sortBy = action.payload;
    },
    clearPropertyList(state) {
      state.properties = [];
    },
    setMapInstance(state, action) {
      state.mapInstance = action.payload;
    },
    setFavoriteProperties(state, action) {
      const filtered = state.favoriteProperties.filter((prop) => prop.uid !== action.payload.uid);
      state.favoriteProperties = [...filtered, action.payload];
    },
    removeFavoriteProperties(state, action) {
      const splice = state.favoriteProperties.splice(state.favoriteProperties.indexOf(action.payload), 1);
      console.log(splice);
      state.favoriteProperties = splice;
    },
    setSelectedCardRef(state, action) {
      state.selectedCardRef = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPropertyTypes.fulfilled, (state, action) => {
        state.status = "idle";
        state.propertyTypes = action.payload;
      })
      .addCase(getProperties.pending, (state) => {
        state.propLoading = true;
      })
      .addCase(getProperties.fulfilled, (state, action) => {
        state.status = "idle";
        state.propLoading = false;
        state.propertiesMeta = action.payload.meta;
        state.properties = action.payload.data;
      })
      .addCase(getProperties.rejected, (state, action) => {
        state.status = "failed";
        state.propLoading = false;
        state.error = action.error.message;
      })
      .addCase(getKeywordsRulesList.fulfilled, (state, action) => {
        state.status = "idle";
        state.keywordsRulesList = action.payload;
      })
      .addCase(getLandBounds.fulfilled, (state, action) => {
        state.status = "idle";
        state.landBounds = action.payload;
      })
      .addMatcher(isPending(...thunks), (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addMatcher(isRejected(...thunks), (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const selectStatus = (state) => state.propertySearch.status === "loading";
export const selectPropertyTypes = (state) => state.propertySearch.propertyTypes;
export const selectProperties = (state) => state.propertySearch.properties;
export const selectKeywordsRulesList = (state) => state.propertySearch.keywordsRulesList;
export const selectLandBounds = (state) => state.propertySearch.landBounds;
export const selectStreetViewCords = (state) => state.propertySearch.streetViewCords;
export const selectSortBy = (state) => state.propertySearch.sortBy;
export const selectPropertyLoading = (state) => state.propertySearch.propLoading;
export const selectPropertyListMeta = (state) => state.propertySearch.propertiesMeta;
export const selectMapInstance = (state) => state.propertySearch.mapInstance;
export const selectFavoriteProps = (state) => state.propertySearch.favoriteProperties;
export const selectSelectedCardRef = (state) => state.propertySearch.selectedCardRef;
export const selectError = (state) => state.propertySearch.error;

export const { openStreetView, sortBy, clearPropertyList, setMapInstance, setFavoriteProperties, removeFavoriteProperties, setSelectedCardRef } = slice.actions;

export default slice.reducer;

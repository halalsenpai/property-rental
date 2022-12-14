import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonToQueryString } from "../../helpers/helpers";

import {
  getPropertyTypes as getPropertyTypesAPI,
  getProperties as getPropertiesAPI,
  getKeywordsRulesList as getKeywordsRulesListAPI,
  getLandBounds as getLandBoundsAPI,
} from "./service";

export const getPropertyTypes = createAsyncThunk("propertySearch/get-property-types", async () => {
  const response = await getPropertyTypesAPI();
  return response.data;
});

export const getProperties = createAsyncThunk("propertySearch/get-propeties", async ({ params }) => {
  const response = await getPropertiesAPI(params);
  console.log("response", response);
  return response;
});

export const getKeywordsRulesList = createAsyncThunk("propertySearch/get-keyword-rules-list", async () => {
  const response = await getKeywordsRulesListAPI();
  return response.data;
});

export const getLandBounds = createAsyncThunk("propertySearch/get-land-bounds", async (coords) => {
  const response = await getLandBoundsAPI(coords);
  console.log(response);
  return response.data;
});

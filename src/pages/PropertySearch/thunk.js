import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonToQueryString } from "../../helpers/helpers";

import { getPropertyTypes as getPropertyTypesAPI, getProperties as getPropertiesAPI, getKeywordsRulesList as getKeywordsRulesListAPI } from "./service";

export const getPropertyTypes = createAsyncThunk("propertySearch/get-property-types", async () => {
  const response = await getPropertyTypesAPI();
  return response.data;
});

export const getProperties = createAsyncThunk("propertySearch/get-propeties", async ({ params }) => {
  const response = await getPropertiesAPI(params);
  return response.data;
});

export const getKeywordsRulesList = createAsyncThunk("propertySearch/get-keyword-rules-list", async () => {
  const response = await getKeywordsRulesListAPI();
  return response.data;
});

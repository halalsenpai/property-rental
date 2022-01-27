import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonToQueryString } from "../../helpers/helpers";

import { getPropertyTypes as getPropertyTypesAPI, getProperties as getPropertiesAPI } from "./service";

export const getPropertyTypes = createAsyncThunk("propertySearch/get-property-types", async () => {
  const response = await getPropertyTypesAPI();
  return response.data;
});

export const getProperties = createAsyncThunk("propertySearch/get-propeties", async ({ qs }) => {
  const _qs = jsonToQueryString(qs);
  const response = await getPropertiesAPI(_qs);
  return response.data;
});

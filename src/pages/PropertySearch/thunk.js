import { createAsyncThunk } from "@reduxjs/toolkit";

import { getPropertyTypes as getPropertyTypesAPI } from "./service";

export const getPropertyTypes = createAsyncThunk("propertySearch/get", async () => {
  const response = await getPropertyTypesAPI();
  return response.data;
});

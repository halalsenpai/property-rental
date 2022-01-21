import { createAsyncThunk } from "@reduxjs/toolkit";

import { getUserInfo as getUserInfoAPI } from "./service";

export const getUserInfo = createAsyncThunk("layout/verify", async () => {
  const response = await getUserInfoAPI();
  return response.data;
});

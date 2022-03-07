import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";

import authReducer from "../auth/slice";
import propertySearchReducer from "../pages/PropertySearch/slice";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["profile"],
};

const reducers = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  propertySearch: propertySearchReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export let persistor = persistStore(store);

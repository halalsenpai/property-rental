import { useKeycloak } from "@react-keycloak/web";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./appComponents/Navbar/Navbar";
import { selectAuthSuccess } from "./auth/slice";
import { getUserInfo } from "./auth/thunk";
import PrivateRoute from "./helpers/ProtectedRoute";
import { PropertySearch } from "./pages/PropertySearch/PropertySearch";
import { getPropertyTypes } from "./pages/PropertySearch/service";
import { selectPropertyTypes } from "./pages/PropertySearch/slice";
import { getToken, setToken } from "./utils/auth";
import { useAppDispatch, useAppSelector, useQuery } from "./utils/hooks";

export const Layout = () => {
  const query = useQuery();
  const dispatch = useAppDispatch();

  // const selectIsAuthenticated = useAppSelector(selectAuthSuccess);

  useEffect(() => {
    const token = query.get("token");
    const localToken = getToken();
    const _token = token || localToken;
    _token && setToken(_token);
    // dispatch(getUserInfo());
  }, []);

  // if (!authenticated) {
  //   return <div>loading</div>;
  // }
  return (
    <div className="Layout">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <div className="App">
                <PropertySearch />
              </div>
            </PrivateRoute>
          }
        />
        <Route path="/test" element={<div>hello</div>} />
      </Routes>
    </div>
  );
};

import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar } from "./appComponents/Navbar/Navbar";
import { selectAuthSuccess } from "./auth/slice";
import { getUserInfo } from "./auth/thunk";
import { PropertySearch } from "./pages/PropertySearch/PropertySearch";
import { getPropertyTypes } from "./pages/PropertySearch/service";
import { selectPropertyTypes } from "./pages/PropertySearch/slice";
import { getToken, setToken } from "./utils/auth";
import { useAppDispatch, useAppSelector, useQuery } from "./utils/hooks";

export const Layout = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const query = useQuery();
  const dispatch = useAppDispatch();

  const selectIsAuthenticated = useAppSelector(selectAuthSuccess);

  useEffect(() => {
    console.log("is auth", selectIsAuthenticated);
    setAuthenticated(selectIsAuthenticated);
  }, [selectIsAuthenticated]);

  useEffect(() => {
    const token = query.get("token");
    const localToken = getToken();
    const _token = token || localToken;
    _token && setToken(_token);
    dispatch(getUserInfo());
  }, []);

  if (!authenticated) {
    return <div>loading</div>;
  }
  return (
    <div className="Layout">
      <Navbar />
      <Switch>
        <Route path="/" component={PropertySearch} />
      </Switch>
    </div>
  );
};

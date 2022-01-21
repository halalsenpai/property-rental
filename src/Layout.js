import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar } from "./appComponents/Navbar/Navbar";
import { getUserInfo } from "./auth/thunk";
import { PropertySearch } from "./pages/PropertySearch/PropertySearch";
import { getPropertyTypes } from "./pages/PropertySearch/service";
import { getToken, setToken } from "./utils/auth";
import { useAppDispatch, useQuery } from "./utils/hooks";

export const Layout = () => {
  const [authenticated, setauthenticated] = useState(false);
  const query = useQuery();
  const dispatch = useAppDispatch();
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

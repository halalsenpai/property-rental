import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Navbar } from "./appComponents/Navbar/Navbar";
import { PropertySearch } from "./pages/PropertySearch/PropertySearch";
import { getPropertyTypes } from "./pages/PropertySearch/service";
import { getToken, setToken } from "./utils/auth";
import { useQuery } from "./utils/hooks";

export const Layout = () => {
  const [authenticated, setauthenticated] = useState(false);
  const query = useQuery();
  useEffect(() => {
    const token = query.get("token");
    const localToken = getToken();
    const _token = token || localToken;
    _token && setToken(_token);
    getPropertyTypes().then((response) => console.log("response", response)).catch((err)=>console.log(err))
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

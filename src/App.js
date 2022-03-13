import { ReactKeycloakProvider } from "@react-keycloak/web";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import keycloak from "./keycloak";
import PrivateRoute from "./helpers/ProtectedRoute";
import { Layout } from "./Layout";
import { useQuery } from "./utils/hooks";

export const App = () => {
  console.log("testing");
  return (
    <ReactKeycloakProvider authClient={keycloak}>
      <BrowserRouter>
        <div className="App">
          <Layout />
        </div>
      </BrowserRouter>
    </ReactKeycloakProvider>
  );
};

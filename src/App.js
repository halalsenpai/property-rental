import { ReactKeycloakProvider } from "@react-keycloak/web";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import keycloak from "./keycloak";
import { Layout } from "./Layout";
import { loadStripe } from "@stripe/stripe-js";

export const App = () => {
  console.log("App works");

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

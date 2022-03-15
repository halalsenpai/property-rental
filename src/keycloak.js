import Keycloak from "keycloak-js";
const keycloak = new Keycloak({
  url: "https://keycloak.psengine.co.uk/auth",
  realm: "sourced",
  clientId: "propapp",
});

export default keycloak;

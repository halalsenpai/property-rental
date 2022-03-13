import React from "react";
import { Select } from "antd";
import { useKeycloak } from "@react-keycloak/web";

const { Option } = Select;

export const Navbar = () => {
  const { keycloak, initialized } = useKeycloak();

  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1"> PropOpp </span>
        <div>
          <Select style={{ width: "100px", height: "38px" }} placeholder="Tool">
            <Option>PropOpp</Option>
          </Select>
          {!keycloak.authenticated && (
            <button type="button" className="btn btn-primary ms-3" onClick={() => keycloak.login()}>
              Login
            </button>
          )}

          {!!keycloak.authenticated && (
            <button type="button" className="btn btn-orange ms-3" onClick={() => keycloak.logout()}>
              Logout ({keycloak.tokenParsed.preferred_username})
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

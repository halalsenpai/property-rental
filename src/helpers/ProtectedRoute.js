import { useKeycloak } from "@react-keycloak/web";
import axios from "axios";
import { useEffect } from "react";
import { getToken, setToken } from "../utils/auth";

const PrivateRoute = ({ children }) => {
  const { keycloak, } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  useEffect(() => {
    if (isLoggedIn) {
        
      console.log("token", keycloak.token);
      const token = keycloak.token;
      const localToken = getToken();
      const _token = token || localToken;
      _token && setToken(_token);
    }
  }, []);

  return isLoggedIn ? (
    children
  ) : (
    <div className="text-center d-flex align-items-center justify-content-center" style={{ height: "90vh" }}>
      You are not authorized to view this page, please login to continue
    </div>
  );
};

export default PrivateRoute;

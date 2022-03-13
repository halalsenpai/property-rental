import { useKeycloak } from "@react-keycloak/web";

const PrivateRoute = ({ children }) => {
  const { keycloak } = useKeycloak();

  const isLoggedIn = keycloak.authenticated;

  return !isLoggedIn ? (
    children
  ) : (
    <div className="text-center d-flex align-items-center justify-content-center" style={{ height: "90vh" }}>
      You are not authorized to view this page, please login to continue
    </div>
  );
};

export default PrivateRoute;

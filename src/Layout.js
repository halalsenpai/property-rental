import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { CheckoutForm } from "./appComponents/CheckoutForm/CheckoutForm";
import { Navbar } from "./appComponents/Navbar/Navbar";
import { SubscriptionPage } from "./appComponents/SubscriptionPage/SubscriptionPage";
import PrivateRoute from "./helpers/ProtectedRoute";
import { PropertySearch } from "./pages/PropertySearch/PropertySearch";
import { getToken, setToken } from "./utils/auth";
import { useAppDispatch, useAppSelector, useQuery } from "./utils/hooks";

const stripePromise = loadStripe("pk_test_51HMaY5Lb539STJok74ksMkkvEBWIl8s179kacDJViQjZAx1SIZk2HXSCMX2icrgKuqnU3QntzscwkyomRrmbxoAA008GfXxclI");

export const Layout = () => {
  const query = useQuery();
  const dispatch = useAppDispatch();

  const options = {
    // passing the client secret obtained from the server
    clientSecret: "sk_test_51HMaY5Lb539STJokLjVsAGXKEP0hwsvE180fFbjnZ5iDqyEmxGhF36IfXXimhbhQ3ML5K2JQYfIYwiYxYdbYqiQP00tXlOS2sE",
  };

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
        <Route
          path="/subscription"
          element={
            <SubscriptionPage />
            // <Elements stripe={stripePromise} options={{clientSecret: ""}}>
            //   <CheckoutForm />{" "}
            // </Elements>
          }
        />
      </Routes>
    </div>
  );
};

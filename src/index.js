import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";

import "bootstrap";
import "antd/dist/antd.css";
import "./assets/scss/index.scss";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();

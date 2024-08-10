import React from "react";
import ReactDOM from "react-dom/client";
// Redux ///////////////////////////////////
import { Provider } from "react-redux";
import { persistor, store } from "../src/store/store";
// Redux-persist ///////////////////////////
import { PersistGate } from "redux-persist/integration/react";
// Stripe ///////////////////////////
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/stripe/stripe.utils";
////////////////////////////////////////////
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Elements stripe={stripePromise}>
            <App />
          </Elements>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

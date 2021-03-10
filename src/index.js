import React, {StrictMode} from "react";
import ReactDOM from 'react-dom'
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import App from "./App";
import {BrowserRouter} from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithHistory>
        <App />
      </Auth0ProviderWithHistory>
    </BrowserRouter>
  </StrictMode>,
  rootElement
);

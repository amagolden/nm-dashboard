import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './frontend/internal/authConfig';

const msalInstance = new PublicClientApplication(msalConfig);

const container = document.getElementById("root");
const root = createRoot(container);

/**
 * We recommend wrapping most or all of your components in the MsalProvider component. It's best to render the MsalProvider as close to the root as possible.
 */
 root.render(
  <React.StrictMode>
      <MsalProvider instance={msalInstance}>
          <App />
      </MsalProvider>
  </React.StrictMode>
);
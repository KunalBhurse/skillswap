import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { Toaster } from "react-hot-toast";

import App from "./App";
import { WalletProvider } from "./context/WalletContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
  <WalletProvider>

    <App />

    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
      }}
    />

  </WalletProvider>
</BrowserRouter>
);
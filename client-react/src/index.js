import React from "react";
import ReactDOM from "react-dom";
import App from "./components/javascripts/App.js";
import { AppProvider } from "context/context";
import "../src/components/styles/index.css";

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

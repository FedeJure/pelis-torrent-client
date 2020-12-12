import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./app/App";
import AdBlockPrevent from "./screens/adblockPrevent/AdBlockPrevent";

if (document.getElementById("root"))
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
else 
  ReactDOM.render(
    <React.StrictMode>
      <AdBlockPrevent />
    </React.StrictMode>,
    document.getElementById("adblockprevent")
  );
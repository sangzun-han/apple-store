import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import clayful from "clayful/client-js";
import axios from "axios";

clayful.config({
  client: process.env.REACT_APP_API_KEY,
});

clayful.install("request", require("clayful/plugins/request-axios")(axios));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./app";
import "bootstrap/dist/css/bootstrap.min.css";
import clayful from "clayful/client-js";
import axios from "axios";

clayful.config({
  client:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ImYwZmRlZTExYjlhODFiZjA3ZGZlZGVhYjAxZjk4NzMwNGIzZDQzNmE0YjM0YjcyYzE1ZmZkZGFlNTMyMmNhMGUiLCJyb2xlIjoiY2xpZW50IiwiaWF0IjoxNjQ3OTE4NDY5LCJzdG9yZSI6IlJYWVdCR1RaWTJQMy5ZVkIzM05NRjc3TEYiLCJzdWIiOiJCNkpOQlVWOERWRUQifQ.YTQeWlMRbcpRZvoJEBvVa0iZNT_he8gL7IA6vM_J-zE",
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

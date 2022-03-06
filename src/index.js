import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom";
import App from "./App";
import store from "./redux/store";
import "antd/dist/antd.min.css";
import "./style/style.scss";
import axios from "axios";
// import reportWebVitals from "./reportWebVitals";

axios.defaults.withCredentials = true;

ReactDOM.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import ConfigPage from "../components/ConfigPage";

window.onload = () => {
  ReactDOM.render(<ConfigPage />, document.querySelector("#app"));
};

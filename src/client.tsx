import { BrowserRouter as Router } from "react-router-dom";
import React from "react";
import ReactDOM from "react-dom";
import { renderRoutes } from "react-router-config";
import routes from "routes";

const render = (Routes: Array<object>) => {
  const renderMethod = ReactDOM.hydrate;

  renderMethod(
    <Router>{renderRoutes(Routes)}</Router>,
    document.getElementById("app")
  );
};

render(routes);

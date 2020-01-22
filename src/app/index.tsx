import React from "react";
import { renderRoutes } from "react-router-config";
import { Link } from "react-router-dom";

interface Route {
  route: { routes: Array<object> };
}

const App = ({ route }: Route) => (
  <div className="app">
    <Link to="/" className={"kek"}>
      <h1>Header</h1>
    </Link>
    <div>
      <Link to="/" className={"kek"}>
        Main
      </Link>
      <Link to="/about" className={"kek"}>
        About
      </Link>
    </div>
    <hr />
    {renderRoutes(route.routes)}
  </div>
);

export default App;

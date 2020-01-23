import React from "react";
import ReactDOM from "react-dom";
import { renderRoutes } from "react-router-config";
import routes from "./routes";
import configureStore from "./core/store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";

import "./style.scss";

const initialState = window.REDUX_DATA;
const { store, history } = configureStore({ initialState });

const render = (Routes: Array<object>) => {
  const renderMethod = ReactDOM.hydrate;

  renderMethod(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {renderRoutes(Routes)}
      </ConnectedRouter>
    </Provider>,
    document.getElementById("app")
  );
};

render(routes);

import { createBrowserHistory, createMemoryHistory } from "history";
import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import thunk from "redux-thunk";

import createRootReducer from "../reducers";

interface Argv {
  initialState?: object;
  url?: string;
}

export default ({ initialState, url }: Argv) => {
  const isServer = typeof window === "undefined";

  const history = isServer
    ? createMemoryHistory({
        initialEntries: [url || "/"]
      })
    : createBrowserHistory();

  const middlewares = [routerMiddleware(history), thunk];

  const composeEnhancers =
    //@ts-ignore
    (!isServer && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
  const enhancers = composeEnhancers(applyMiddleware(...middlewares));
  const store = createStore(
    createRootReducer(history),
    initialState || {},
    enhancers
  );

  return { store, history };
};

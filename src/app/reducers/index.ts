import { combineReducers } from "redux";
import { History } from "history";
import { connectRouter } from "connected-react-router";

import home from "./home";

export default (history: History) =>
  combineReducers({
    home,
    router: connectRouter(history)
  });

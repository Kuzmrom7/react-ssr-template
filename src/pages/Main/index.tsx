/*
 * Due to this known issue: https://github.com/smooth-code/loadable-components/issues/173
 * Use .js extension for code-splitting file
 */

import React from "react";
import loadable from "@loadable/component";

import ErrorBoundary from "../../components/ErrorBoundary";

const Main = loadable(() => import("./Main"), {
  fallback: <div>Loading</div>
});

export default props => (
  <ErrorBoundary>
    <Main {...props} />
  </ErrorBoundary>
);

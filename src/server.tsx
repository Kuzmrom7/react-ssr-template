import express from "express";
import React from "react";
import path from "path";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import htmlTemplate from "./core/template";
import { renderRoutes, matchRoutes } from "react-router-config";
import routes from "./routes";
import configureStore from "./core/store";
import { Provider } from "react-redux";
import { ChunkExtractor } from "@loadable/server";

const app = express();

app.use(express.static(path.resolve(__dirname, "../dist")));

app.get("/*", (req, res) => {
  const { store } = configureStore({ url: req.url });

  const loadBranchData = (): Promise<any> => {
    const branch = matchRoutes(routes, req.path);

    const promises = branch.map(({ route, match }: any) => {
      if (route.loadData) {
        return Promise.all(
          route
            .loadData({
              params: match.params,
              query: req.query,
              getState: store.getState
            })
            .map((item: any) => store.dispatch(item))
        );
      }
      return Promise.resolve(null);
    });
    return Promise.all(promises);
  };

  (async () => {
    try {
      await loadBranchData();

      const statsFile = path.resolve(process.cwd(), "dist/loadable-stats.json");
      const extractor = new ChunkExtractor({ statsFile });

      const staticContext: any = {};

      const jsx = extractor.collectChunks(
        <Provider store={store}>
          <StaticRouter location={req.path} context={staticContext}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      );

      const reactDom = renderToString(jsx);

      if (staticContext.url) {
        res.status(301).setHeader("Location", staticContext.url);
        res.end();
        return;
      }

      const status = staticContext.status === "404" ? 404 : 200;

      const reduxState = store.getState();

      res.status(status).send(htmlTemplate(reactDom, reduxState, extractor));
    } catch (error) {
      res.status(404).send("Not Found :(");

      console.error(`==> 😭  Rendering routes error: ${error}`);
    }
  })();
});

app.listen(8080, error => {
  if (error) {
    console.error(error);
    return;
  }

  console.log(`==>[server]  ✅  Server listening on port: 8080`);
});

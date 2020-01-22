import express from "express";
import React from "react";
import path from "path";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import htmlTemplate from "./template";
import { renderRoutes, matchRoutes } from "react-router-config";
import routes from "./routes";

const app = express();

app.use(express.static(path.resolve(__dirname, "../dist")));

app.get("/*", (req, res) => {
  const loadBranchData = (): Promise<any> => {
    const branch = matchRoutes(routes, req.path);

    const promises = branch.map(({ route, match }: any) => {
      if (route.loadData) {
        return Promise.all(
          route.loadData({ params: match.params, query: req.query })
          // .map((item: MyAction) => store.dispatch(item))
        );
      }
      return Promise.resolve(null);
    });
    return Promise.all(promises);
  };

  (async () => {
    try {
      await loadBranchData();

      const staticContext: any = {};

      const jsx = (
        <StaticRouter location={req.path} context={staticContext}>
          {renderRoutes(routes)}
        </StaticRouter>
      );

      const reactDom = renderToString(jsx);

      if (staticContext.url) {
        res.status(301).setHeader("Location", staticContext.url);
        res.end();

        return;
      }

      const status = staticContext.status === "404" ? 404 : 200;

      res.status(status).send(htmlTemplate(reactDom));
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

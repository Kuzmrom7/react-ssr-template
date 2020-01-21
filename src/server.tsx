import express from "express";
import React from "react";
import path from "path";
import { renderToString } from "react-dom/server";
import App from "./app";
import htmlTemplate from "./template";

const app = express();

app.use(express.static(path.resolve(__dirname, "../dist")));

app.get("/*", (req, res) => {
  const jsx = <App />;
  const reactDom = renderToString(jsx);

  res.writeHead(200, { "Content-Type": "text/html" });

  res.end(htmlTemplate(reactDom));
});

app.listen(8080, err => {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }

  console.log(`[server] Server listening on port: 8080`);
});

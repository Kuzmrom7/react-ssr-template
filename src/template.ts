const isDev = process.env.NODE_ENV !== "production";

let buildNumber = 0;

if (!isDev) {
  const meta = require("../meta.json");
  buildNumber = meta.buildNumber;
}

function htmlTemplate(reactDom) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
        
            <title>React SSR</title>
            <link rel="stylesheet" type="text/css" href="./styles.css" />
        </head>
        
        <body>
            <div id="app">${reactDom}</div>
            <script>
                window.REDUX_DATA = "kek"
            </script>
            ${
              isDev
                ? `<script src="./bundle.js"></script>`
                : `<script src="./bundle.${buildNumber}.js"></script>`
            }
           
        </body>
        </html>
    `;
}

export default htmlTemplate;

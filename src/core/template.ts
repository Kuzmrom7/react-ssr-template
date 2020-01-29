import serialize from "serialize-javascript";

function htmlTemplate(reactDom, reduxState, extractor) {
  return `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
        
            <title>React SSR</title>
      

            <!-- Insert bundled styles into <link> tag -->
            ${extractor.getLinkTags()}
            ${extractor.getStyleTags()}
        </head>
        
        <body>
            <div id="app">${reactDom}</div>
            <script>
                window.REDUX_DATA = ${serialize(reduxState, { isJSON: true })}
            </script>


            <!-- Insert bundled scripts into <script> tag -->
            ${extractor.getScriptTags()}
           
        </body>
        </html>
    `;
}

export default htmlTemplate;

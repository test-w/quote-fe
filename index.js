const http = require("http");

const QUOTE_SPONSORED_BY = process.env.QUOTE_SPONSORED_BY || "[QUOTE_SPONSORED_BY]";
const QUOTE_SERVER_NAME = process.env.QUOTE_SERVER_NAME || "[QUOTE_SERVER_NAME]";
const QUOTE_SERVER_PROTOCOL = process.env.QUOTE_SERVER_PROTOCOL || false;

const httpServer = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <html>
    <style>
    *
    {
      font-family: ariel, sans-serif;
    }
    blockquote
    {
      font-size: 2rem;
      font-family: Times New Roman, serif;
    }
    footer
    {
      font-size: 1rem;
      font-style: italic;
    }
    </style>
    <body>
    <h1>Quote sponsored by: ${QUOTE_SPONSORED_BY}</h1>
    <blockquote>
      <p id="quote-text"></p>
      <footer id="quote-author"></footer>
    </blockquote>
    <pre style="color: red;" id="error-message"></pre>
    <script>
    const protocol = ${QUOTE_SERVER_PROTOCOL} || location.protocol;
    const quote_url = protocol + "//${QUOTE_SERVER_NAME}/quote";
    fetch(quote_url + "?t=" + Date.now()).then((response) => {
      return response.json();
    }, (error) => {
      document.getElementById("error-message").textContent = "FAILED: GET " + quote_url;
    }).then((quote) => {
      document.getElementById("quote-text").textContent = quote.text;
      document.getElementById("quote-author").textContent = quote.author;
    }, (error) => {
      document.getElementById("error-message").textContent = "REQUESTED: GET " + quote_url + "\\nFAILED: " + error;
    });
    </script>
    </body>
    </html>`);
});

httpServer.listen(process.env.PORT || '8080');

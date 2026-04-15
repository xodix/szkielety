const http = require("http");

function show(res) {
  let html =
    "<html><head><title>Lista zadan</title></head><body>" +
    "<h1>Lista zadan</h1>" +
    '<form method="post" action="/">' +
    '<p><input type="text" name="item" />' +
    '<input type="submit" name="type" value="Dodaj" />' +
    '<input type="submit" name="type" value="Skasuj" /></p>' +
    "<ul>" +
    items
      .map(function (item) {
        return "<li>" + item + "</li>";
      })
      .join("") +
    "</ul>" +
    "</form></body></html>";
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", Buffer.byteLength(html));
  res.end(html);
}

function notFound(res) {
  res.statusCode = 404;
  res.setHeader("Content-Type", "text/plain");
  res.end("Not Found");
}

function badRequest(res) {
  res.statusCode = 400;
  res.setHeader("Content-Type", "text/plain");
  res.end("Bad Request");
}

let items = [];
let qs = require("querystring");
function add(req, res) {
  var body = "";
  req.setEncoding("utf8");
  req.on("data", function (chunk) {
    body += chunk;
  });
  req.on("end", function () {
    var obj = qs.parse(body);
    if (obj.type === "Dodaj") {
      items.push(obj.item);
    } else {
      items.length = 0;
    }
    show(res);
  });
}

const server = http.createServer(function (req, res) {
  if ("/" == req.url) {
    switch (req.method) {
      case "GET":
        show(res);
        break;
      case "POST":
        add(req, res);
        break;
      default:
        badRequest(res);
    }
  } else {
    notFound(res);
  }
});

const PORT = 3000;
console.log(`Running server on http://localhost:${PORT}`);
server.listen(PORT);

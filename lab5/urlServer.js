const http = require("http");
const url = require("url");
http
  .createServer(function (req, res) {
    let q = url.parse(req.url, true).query;

    const a = +q.a;
    const b = +q.b;
    const c = +q.c;
    let text = `a: ${a}, b: ${b}, c: ${c}<br>`;
    if (isNaN(a) || isNaN(b) || isNaN(c) || !q.a || !q.b || !q.b) {
      res.writeHead(400, { "Content-Type": "text/html;charset=UTF-8" });
      text += "<p>Wrong numbers in url</p>";
      return res.end(text);
    }
    if (a + b <= c || b + c <= a || a + c <= b) {
      res.writeHead(400, { "Content-Type": "text/html;charset=UTF-8" });
      text += "<p>To nie jest trójkąt</p>";
      return res.end(text);
    }

    const p = (a + b + c) / 2;
    const area = Math.sqrt(p * (p - a) * (p - b) * (p - c));
    text += `<h2>The area of the triangle is ${area}</h2>`;
    res.writeHead(200, { "Content-Type": "text/html;charset=UTF-8" });
    return res.end(text);
  })
  .listen(3000);

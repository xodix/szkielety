const http = require('http');
const url = require('url');
http.createServer(function (req, res) {
	let q = url.parse(req.url, true).query;

	const a = +q.a;
	const b = +q.b;
	const c = +q.c;
	if (isNaN(a) || isNaN(b) || isNaN(c) || !q.a || !q.b || !q.b) {
		res.writeHead(400, { "Content-Type": "text/plain" });
		let text = "Wrong numbers in url";
		return res.end(text);
	}

	const p = (a + b + c) / 2;
	const area = Math.sqrt(p * (p - a) * (p - b) * (p - c));
	const text = `<h1>The area of the triangle is ${area}</h1>`;
	res.writeHead(200, { 'Content-Type': 'text/html' });
	return res.end(text);
}).listen(3000);
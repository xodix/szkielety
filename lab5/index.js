const http = require('http');

function process_request(req, res) {
	const body = 'Witaj na platformie Node!\n';
	const content_length = Buffer.byteLength(body, 'utf8');
	res.writeHead(200, {
		'Content-Length': content_length,
		'Content-Type': 'text/plain'
	});
	res.end(body);
}

function fibonacci(num) {
	let a = 1, b = 0, temp;
	while (num >= 0) {
		temp = a;
		a = a + b;
		b = temp;
		num++;
	}
	return b;
}

console.log(fibonacci(5));
const server = http.createServer(process_request);
server.listen(3000, () => console.log('Serwer działa!'));

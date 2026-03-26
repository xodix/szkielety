const http = require('http');
const fs = require('fs');

/**
 * @param {http.ServerResponse<http.IncomingMessage> & {req: http.IncomingMessage;}} res 
 * @param {string} path 
 * @param {string} contentType 
 * @param {number} responseCode 
 */
function serveStaticFile(res, path, contentType, responseCode = 200) {
	fs.readFile(__dirname + path, (err, data) => {
		if (err) {
			console.error(err.cause);
			res.writeHead(500, { 'Content-Type': 'text/plain' });
			return res.end('500 - Blad wewnetrzny');
		}
		res.writeHead(responseCode, { 'Content-Type': contentType });
		res.end(data);
	});
}

const server = http.createServer((req, res) => {
	switch (req.url) {
		case '/':
			serveStaticFile(res, '/public/home.html', 'text/html');
			break;

		case '/about':
			serveStaticFile(res, '/public/about.html', 'text/html');
			break;

		case '/cat.webp':
			serveStaticFile(res, '/img/cat.webp', 'image/webp');
			break;

		default:
			serveStaticFile(res, '/public/404.html', 'text/html', 404);
			break;
	}
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server działa na porcie ${PORT}; ` + 'naciśnij Ctrl+C, aby zakończyć'));
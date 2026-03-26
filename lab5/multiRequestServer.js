const http = require("http");

function displayHome() {
	return `<h1>This is a home page</h1>`;
}
function displayAbout() {
	return `<h1>This is an about page</h1>`;
}
function display404() {
	return `<h1>Nothing interesting here 404</h1>`;
}

// Other use BST
const urlDict = {
	"/home": displayHome,
	"/about": displayAbout,
};

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/html");
	if (urlDict[req.url]) {
		return res.end(urlDict[req.url]());
	} else {
		res.statusCode = 404;
		return res.end(display404());
	}
});

const HOSTNAME = "localhost";
const PORT = 3000;
server.listen(PORT, HOSTNAME, () => {
	console.log(`Server running at http://${HOSTNAME}:${PORT}/`);
});
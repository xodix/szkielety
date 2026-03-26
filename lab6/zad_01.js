const express = require("express");
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
	res.send("Prosty serwer oparty na szkielecie programistycznym Express!");
});
app.get('/about', (req, res) => {
	res.send("Autor strony: Jan Kowalski");
});
app.get('/name/:imie1/:imie2', (req, res) => {
	res.send(``);
});
app.get('/name/:imie', function (request, response) {
	response.status(200);
	response.set('Content-Type', 'text/html');
	response.end(`<html><body>' + '<h1>Cześć ${req.params.imie1} i ${req.params.imie2}</h1></body></html>`);
});

app.listen(PORT, () => {
	console.log(`Serwer działa na porcie: ${PORT}, http://localhost:${PORT}`);
});
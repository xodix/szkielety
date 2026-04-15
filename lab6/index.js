const express = require('express');
const { check, validationResult } = require('express-validator');

const path = require('path');
const app = express();
const PORT = 3000;
app.get("/form", (req, res) => {
	res.sendFile(path.join(__dirname, "form.html"));
});

app.post("/result", (req, res) => {
	let username = req.query.username;
	let password = req.query.password;
	if (!username || !password) {
		res.status(400).send(`Uzupełnij dane`);
	}

	res.send(`Użytkownik: ${username}<br>Hasło: ${password}`);
});

// Zadanie 1.10
app.post("/form", [
	check('nazwisko').isLength({ min: 3 }),
	check('email').isEmail(),
	check('wiek').isNumeric()
], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	const nazwisko = req.body.nazwisko;
	const email = req.body.email;
	const wiek = req.body.wiek;
	res.send("Użytkownik: " + nazwisko + "<br>Email: " + email + "<br>Wiek: " + wiek);
});

app.listen(PORT, () => console.log(`Serwer działa na porcie ${PORT}`));
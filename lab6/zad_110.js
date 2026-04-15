const express = require("express");
const path = require("path");
const { check, validationResult } = require("express-validator");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "form.html"));
});

app.post("/result", (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    res.status(400).send("Uzupełnij dane!");
  }

  res.send("Użytkownik: " + username + "<br>Hasło: " + password);
});

app.get("/form_new", (req, res) => {
  res.sendFile(path.join(__dirname, "form_new.html"));
});

app.post("/result_new", (req, res) => {
  let fullname = req.body.fullname;
  let langs = req.body.langs;
  if (!fullname || !langs) {
    res.status(400).send("Uzupełnij dane!");
  }

  let text = `Użytkownik: ${fullname}<br>Języki:<ul>`;
  if (Array.isArray(langs))
    text += langs.map((lang) => `<li>${lang}</li>`).join("");
  else text += `<li>${langs}</li>`;
  text += `</ul>`;

  res.send(text);
});

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie: ${PORT}, http://localhost:${PORT}`);
});

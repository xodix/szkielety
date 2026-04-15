const express = require("express");
const path = require("path");
const { check, validationResult } = require("express-validator");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/form", (req, res) => {
  res.sendFile(path.join(__dirname, "form3.html"));
});

app.post(
  "/form",
  [
    check("nazwisko")
      .trim()
      .stripLow()
      .isLength({ min: 3, max: 25 })
      .bail()
      .matches(/^[A-Z][a-z]+ [A-Z][a-z]+$/)
      .withMessage(
        "Nazwisko składa się wyłącznie z liter alfabetu, jego długość jest między <3, 25>"
      )
      .customSanitizer((value) => {
        // faster solution
        let initials = "";
        initials += value.charAt(0);
        let i = 0;
        while (i < value.length && value.charAt(i) !== " ") {
          i++;
        }
        if (i + 1 < value.length) initials += value.charAt(i + 1);

        return initials;
      }),
    check("email")
      .isEmail()
      .trim()
      .stripLow()
      .normalizeEmail()
      .withMessage("email musi spełniać format email określony RFC 5322"),
    check("wiek")
      .isInt({ gt: 0, lt: 110 })
      .withMessage("Wiek to liczba całkowita między 0 a 110"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const nazwisko = req.body.nazwisko;
    const email = req.body.email;
    const wiek = req.body.wiek;
    res.send(
      "Użytkownik: " + nazwisko + "<br>Email: " + email + "<br>Wiek: " + wiek
    );
  }
);

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie: ${PORT}, http://localhost:${PORT}`);
});

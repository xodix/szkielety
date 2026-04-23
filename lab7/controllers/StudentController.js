const router = require("express").Router();
const Student = require("../models/Student.js");
const { check, validationResult } = require("express-validator");


async function insert(req, res) {
	let student = new Student();
	student.fullName = req.body.fullName;
	student.email = req.body.email;
	student.mobile = req.body.mobile;
	student.city = req.body.city;
	try {
		await student.save();
		res.redirect("/list");
	} catch (err) {
		console.log("Błąd podczas dodawania studenta: " + err);
	}
}

async function update(req, res) {
	try {
		await Student.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true });
		res.redirect("list");
	} catch (err) {
		console.log("Błąd podczas aktualizowania danych: " + err);
	}
}

router.get("/", (req, res) => {
	res.send(`
 <h3 style="text-align:center">Baza danych studentów</h3>
 <h4 style="text-align:center">Kliknij <a href="/list"> tutaj</a>, aby uzyskać dostęp do bazy.</h4>`);
});

router.get("/list", (req, res) => {
	Student.find().then((docs) => {
		res.render("list", {
			list: docs
		});
	}).catch((err) => {
		console.log("Błąd pobierania danych" + err);
	});
});

router.get("/addOrEdit", (req, res) => {
	res.render("addOrEdit", {
		viewTitle: "Dodaj studenta"
	});
});

router.post("/", [
	check("fullName", "Imię i nazwisko jest wymagane").notEmpty().isLength({ min: 3, max: 70 }),
	check("email", "Nieprawidłowy adres email").isEmail(),
	check("mobile", "Nieprawidłowy numer telefonu").isNumeric().isLength({ min: 9 }),
	check("city", "Miasto jest wymagane").notEmpty().isLength({ min: 2 })
], (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.render("addOrEdit", {
			viewTitle: req.body._id == "" ? "Dodaj studenta" : "Zaktualizuj dane studenta",
			student: req.body,
			errors: errors.array()
		});
	}

	if (req.body._id == "") {
		insert(req, res);
	} else {
		update(req, res);
	}
});

router.get("/:id", (req, res) => {
	Student.findById(req.params.id).then((doc) => {
		res.render("addOrEdit", {
			viewTitle: "Zaktualizuj dane studenta",
			student: doc
		});
	}).catch((err) => {
		console.log("Błąd podczas akutalizowania danych" + err);
	});
});

router.get("/delete/:id", (req, res) => {
	Student.findByIdAndRemove(req.params.id).then((doc) => {
		res.redirect("/list");
	}).catch((err) => {
		console.log("Błąd podczas usuwania: " + err);
	});
});

module.exports = router;
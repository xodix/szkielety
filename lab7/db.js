const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
	.then((result) => {
		console.log("Połączono z bazą");
	}).catch((err) => {
		console.log("Nie można połączyć się z MongoDB. Błąd: " + err);
	});

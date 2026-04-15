// 2.1
function wyswietlLiczby(...argumenty) {
	console.log(argumenty);
	let ret = "Suma liczb: " + argumenty.join(", ");
	ret += ` wynosi ${argumenty.reduce((prev, curr) => prev + curr)} `;

	return ret;
}
console.log("2.1");
console.log(wyswietlLiczby(4, 6, 7, 9, 0, 2));

// 2.2
function zad2() {
	const listaZadan = [
		{
			id: 1,
			tekst: "Zrobienie zakupów",
			zrealizowano: true
		},
		{
			id: 2,
			tekst: "Przegląd techniczny samochodu",
			zrealizowano: false
		},
		{
			id: 3,
			tekst: "Wizyta u dentysty",
			zrealizowano: false
		},
	];

	listaZadan.forEach(elem => {
		console.log(elem.tekst);
	});

	console.log(listaZadan.map(elem => elem.tekst));

	console.log(listaZadan.filter(elem => elem.zrealizowano));
}
console.log("2.2");
zad2();

function zad3() {
	const poniedzialek = [
		{
			'nazwa': 'Przygotowania do zajęć z AI',
			'czas': 180
		},
		{
			'nazwa': 'Realizacja projektu z AI',
			'czas': 120
		}
	];
	const wtorek = [
		{
			'nazwa': 'Rozbudowa swojego bloga',
			'czas': 240
		},
		{
			'nazwa': 'Administrowanie serwisem szkoly',
			'czas': 180
		},
		{
			'nazwa': 'Sluchanie koncertu online',
			'czas': 240
		}];

	let res = poniedzialek
		.concat(wtorek) // 1
		.map(task => {
			task.czas = +task.czas / 60;
			return task;
		}) // 2
		.filter(task => task.czas > 2) // 3
		.map(task => +task.czas * 35) // 4
		.reduce((prev, curr) => {
			if (!Array.isArray(prev)) {
				return [prev + curr];
			} else {
				return [prev[0] + curr];
			}
		}) // 5
		.map(currSum => currSum.toFixed(2) + "PLN") // 6
		.reduce((prev, curr) => curr[0]); // 7
	console.log(res);
}

console.log("2.3");
zad3();

function zad4() {
	const firmy = [
		{ nazwa: "Abasco", kategoria: "IT", poczatek: 1999, koniec: 2010 },
		{ nazwa: "Redis", kategoria: "IT", poczatek: 1993, koniec: 1998 },
		{ nazwa: "Komp", kategoria: "IT", poczatek: 2003, koniec: 2018 },
		{ nazwa: "Bosco", kategoria: "Technologie", poczatek: 2011, koniec: 2014 },
		{ nazwa: "CCA", kategoria: "IT", poczatek: 1991, koniec: 1995 },
		{ nazwa: "Autosan", kategoria: "Auto", poczatek: 2009, koniec: 2018 },
		{ nazwa: "Broke", kategoria: "Finanse", poczatek: 1990, koniec: 1992 },
		{ nazwa: "Funds", kategoria: "Finanse", poczatek: 2000, koniec: 2021 }
	];

	const firmyIT = firmy.filter(company => company.kategoria === "IT");
	console.log(firmyIT);
	// Logical assumption
	const firmy90 = firmy.filter(company => company.poczatek >= 1990 && company.koniec <= 1999);
	console.log(firmy90);
	const firmy10plus = firmy.filter(company => (company.koniec - company.poczatek) > 10);
	console.log(firmy10plus);
}

console.log("2.4");
zad4();

let calc = require("./funkcje.js");
calc.calc();
import { calc } from "./funkcje.js";
import calc from "./funkcje.js";
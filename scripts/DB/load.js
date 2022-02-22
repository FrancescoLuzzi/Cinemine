const defaultTipologie = ['horror', 'comico', 'azione', ' rosa'];
const defaultFilms = [
	{
		nome: 'BlackWidow',
		src: '../images/black_widow.jpg',
		tipologia: ['azione'],
		durata: '133',
	},
	{
		nome: 'MrBean',
		src: '../images/mrBean.jpg',
		tipologia: ['comico'],
		durata: '86',
	},
	{
		nome: 'Il Diavolo Veste Prada',
		src: '../images/diavoloVestePrada.jpg',
		tipologia: ['rosa', 'comico'],
		durata: '19',
	},
];

const curr_year= new Date().getFullYear()

//LOGS

function inizializeLogs() {
	sessionStorage.setItem('Log', JSON.stringify([]));
}

//USER

function setUser(infos, films, tickets) {
	let newUser = {
		infos: infos,
		filmsRented: films,
		ticketsOwned: tickets,
		attivo: true,
	};
	sessionStorage.setItem('User', JSON.stringify(newUser));
}

function loadUser(films) {
	const filmsRented = films.slice(1, 3).map((el) => {
		let el2 = JSON.parse(JSON.stringify(el));
		el2.dataScadenza = `${curr_year}-12-${Math.floor(Math.random() * 18) + 1}`;
		return el2;
	});
	const ticketsOwned = films.slice(1, 3).map((el) => JSON.parse(JSON.stringify(el)));

	ticketsOwned[0].posti = 'H5';
	ticketsOwned[0].ora = '20:00';
	ticketsOwned[0].data = `${curr_year}-1-25`;
	ticketsOwned[0].cinema = 'Cinepark';
	ticketsOwned[0].sala = '2';

	ticketsOwned[1].posti = 'G8';
	ticketsOwned[1].ora = '22:00';
	ticketsOwned[1].data = `${curr_year}-1-15`;
	ticketsOwned[1].cinema = 'Cinepark';
	ticketsOwned[1].sala = '1';

	const userInfos = {
		name: 'Beppone78',
		descrizione: 'ciao sono Beppone78, vivo a Bologna e mi piaccono i tortellini',
		tipologiePreferite: ['horror', 'comico', 'azione', ' rosa'],
		luogo: 'via talDeiTali',
		numTelefono: '6594859305',
	};

	setUser(userInfos, filmsRented, ticketsOwned);
}

//CINEMA

function setCinema(infos, filmsOwned, filmsScheduled, rooms, spettacoli, politiche) {
	let newCinema = {
		infos: infos,
		sale: rooms,
		filmsOwned: filmsOwned,
		filmsScheduled: filmsScheduled,
		shows: spettacoli,
		politicheVendita: politiche,
		attivo: true,
	};
	sessionStorage.setItem('Cinema', JSON.stringify(newCinema));
}

function createSala(rows, cols) {
	const i = 2;
	const j = cols - 3;
	let row = Array.from(Array(cols), (_, curr) => {
		if (curr != i && curr != j) return true;
	});
	return Array.from(Array(rows), (_) => [...row]);
}

function occupaSalaRandom(sala) {
	for (let row of sala) {
		for (let i in row) {
			if (row[i] != undefined && Math.floor(Math.random() * 7) === 0) row[i] = false;
		}
	}
	return sala;
}

function loadCinema(films) {
	const cinemaInfos = {
		name: 'Cinepark',
		descrizione: 'Benvenuti in Cinepark, spero vi divertiate nel nostro cinema',
		luogo: 'Un posto nel ferrarese',
		numTelefono: '3671248950',
	};
	const sale = [
		{
			numero: 1,
			sala: [...createSala(12, 12)],
		},
		{
			numero: 2,
			sala: [...createSala(10, 10)],
		},
	];

	const filmsOwnedCinema = films.slice(1, 3).map((el) => {
		let el2 = JSON.parse(JSON.stringify(el));
		el2.dataScadenza = `${curr_year}-12-31`;
		el2.noleggiabile = true;
		return el2;
	});

	const filmsScheduledCinema = films.slice(1, 3).map((el) => JSON.parse(JSON.stringify(el)));
	let tmp = JSON.parse(JSON.stringify(sale[0]));
	filmsScheduledCinema[0].intervalloScheduled = {
		start: `${curr_year}-1-01`,
		end: `${curr_year}-12-31`,
	};
	filmsScheduledCinema[0].orari = ['17.30', '20.00', '22.00'];
	filmsScheduledCinema[0].sale = [tmp];
	let tmp2 = JSON.parse(JSON.stringify(sale[1]));
	filmsScheduledCinema[1].intervalloScheduled = {
		start: `${curr_year}-1-01`,
		end: `${curr_year}-12-31`,
	};
	filmsScheduledCinema[1].orari = ['17.30', '20.00'];
	filmsScheduledCinema[1].sale = [tmp2];

	const spettacoli = films.slice(1, 3).map((el) => JSON.parse(JSON.stringify(el)));
	let tmp3 = JSON.parse(JSON.stringify(sale[0]));
	tmp3.sala = occupaSalaRandom(tmp3.sala);
	spettacoli[0].sala = tmp3;
	spettacoli[0].data = `${curr_year}-1-07`;
	spettacoli[0].orario = '22.00';
	let tmp4 = JSON.parse(JSON.stringify(sale[1]));
	tmp4.sala = occupaSalaRandom(tmp4.sala);
	spettacoli[1].sala = tmp4;
	spettacoli[1].data = `${curr_year}-1-07`;
	spettacoli[1].orario = '20.00';

	const politiche = [
		{ nome: 'intero', prezzo: 8, intervallo: '14-59 anni' },
		{ nome: 'ridotto', prezzo: 4, intervallo: '<14 >59 anni' },
	];

	setCinema(cinemaInfos, filmsOwnedCinema, filmsScheduledCinema, sale, spettacoli, politiche);
}

//CASA DI DISTRIBUZIONE

function setCDD(infos, filmsOwned, permissions) {
	let newCDD = {
		infos: infos,
		filmsOwned: filmsOwned,
		permissions: permissions,
		attivo: true,
	};
	sessionStorage.setItem('CDD', JSON.stringify(newCDD));
}

function loadCDD(films) {
	const CDDInfos = {
		name: 'Medusa',
		descrizione: 'Medusa è una delle più conosciute case di distribuzione nel mondo',
		luogo: 'Viale Aventino 26 Roma',
		numTelefono: '+39 06 57781',
	};

	const filmsOwnedCDD = films.map((el) => JSON.parse(JSON.stringify(el)));

	const permissions = [
		{
			dataScadenza: `${curr_year}-12-31`,
			cinema: 'Cinepark',
			film: JSON.parse(JSON.stringify(defaultFilms[1])),
			permission: 'Both',
		},
		{
			dataScadenza: `${curr_year}-12-31`,
			cinema: 'Cinepark',
			film: JSON.parse(JSON.stringify(defaultFilms[2])),
			permission: 'Both',
		},
	];
	setCDD(CDDInfos, filmsOwnedCDD, permissions);
}

//ADDETTO SICUREZZA
function setAddetto() {
	let addetto = {
		nome: 'Osvaldo',
		cognome: 'Depeppoli',
		telefono: '3681936820',
	};
	sessionStorage.setItem('AddettoSicurezza', JSON.stringify(addetto));
}

function loadData() {
	if (sessionStorage.getItem('User') != null) return;
	inizializeLogs();
	setAddetto();
	loadUser(defaultFilms);
	loadCinema(defaultFilms);
	loadCDD(defaultFilms);
}

//LOAD DATA BEFORE window.onload
document.onreadystatechange = () => {
	loadData();
};

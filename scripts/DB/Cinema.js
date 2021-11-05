function getCinema() {
	return JSON.parse(sessionStorage.getItem('Cinema'));
}

function addOwnedFilmCinema(newFilm) {
	let cinema = JSON.parse(sessionStorage.getItem('Cinema'));
	if (!cinema.attivo) throw new Error('Account non attivo');
	cinema.filmsOwned.push(newFilm);
	sessionStorage.setItem('Cinema', JSON.stringify(cinema));
}

function addSala(sala) {
	let cinema = JSON.parse(sessionStorage.getItem('Cinema'));
	let log;
	if (!cinema.attivo) throw new Error('Account non attivo');
	for (let el of cinema.sale) {
		if (el.numero == sala.numero) {
			log = new Log('Cinema', `Failed to add Sala(${sala.numero})`);
			throw new Error('Sala già esistente');
		}
	}
	cinema.sale.push(sala);
	log = new Log('Cinema', `Added new Sala(${sala.numero})`);
	addLog(log);
	sessionStorage.setItem('Cinema', JSON.stringify(cinema));
}

function createSala(rows, cols) {
	const i = 2;
	const j = cols - 3;
	let row = Array.from(Array(cols), (_, curr) => {
		if (curr != i && curr != j) return true;
	});
	return Array.from(Array(rows), (_) => [...row]);
}

function createBlandSala(rows, cols) {
	let row = Array.from(Array(cols), (_, curr) => {
		return true;
	});
	return Array.from(Array(rows), (_) => [...row]);
}

function clearSala(sala) {
	for (let row of sala) {
		for (let i in row) {
			if (row[i] != undefined) row[i] = true;
		}
	}
	return sala;
}

function addShow(newShow) {
	let cinema = JSON.parse(sessionStorage.getItem('Cinema'));
	if (!cinema.attivo) throw new Error('Account non attivo');
	cinema.shows.push(newShow);
	sessionStorage.setItem('Cinema', JSON.stringify(cinema));
}

/**
 *
 * @param {*} newSchedule
 * Given a newSchedule this will add this schedule to the Cinema's scheduledFilms
 * BUT:
 * 		1)if the schedule is for the same film in the same cinema room during the same period this will abort
 * 		2)if the schedule is for the same film during the same period but in a cinema room, this will add the new cinema room to the existing schedule
 * @throws Error
 */
function addScheduledFilm(newSchedule) {
	let cinema = JSON.parse(sessionStorage.getItem('Cinema'));
	if (!cinema.attivo) throw new Error('Account non attivo');
	let newStart = new Date(newSchedule.intervalloScheduled.start);
	let newEnd = new Date(newSchedule.intervalloScheduled.end);
	for (let el of cinema.filmsScheduled) {
		let currStart = new Date(el.intervalloScheduled.start);
		let currEnd = new Date(el.intervalloScheduled.end);
		if (
			(compareDates(newStart, currStart) >= 0 && compareDates(currStart, currEnd) <= 0) ||
			(compareDates(newEnd, currEnd) <= 0 && compareDates(newEnd, currStart) >= 0)
		) {
			//cerco se è la stessa sala
			for (let elSala of el.sale) {
				if (elSala.numero == newSchedule.sala.numero) {
					let log = new Log('Cinema', `Failed to Add Programmazione(${newSchedule.nome}-sala${newSchedule.sala.numero})`);
					addLog(log);
					throw new Error('Overlapping di Programmazioni, immetti nuovi estremi');
				}
			}
		}
		if (el.nome == newSchedule.nome && compareDates(newStart, currStart) == 0 && compareDates(newEnd, currEnd) == 0) {
			//cerco se è la stessa sala
			for (let elSala of el.sale) {
				if (elSala.numero == newSchedule.sala.numero) {
					let log = new Log('Cinema', `Failed to Add Programmazione(${newSchedule.nome}-sala${newSchedule.sala.numero})`);
					addLog(log);
					throw new Error('Overlapping di Programmazioni, immetti nuovi estremi');
				}
			}
			el.sale.push(newSchedule.sala);
			let log2 = new Log('Cinema', `Updated schedule ${newSchedule.nome}`);
			addLog(log2);
			sessionStorage.setItem('Cinema', JSON.stringify(cinema));
			return;
		}
	}
	newSchedule.sale = [newSchedule.sala];
	delete newSchedule.sala;
	cinema.filmsScheduled.push(newSchedule);
	let log3 = new Log('Cinema', `Added new schedule(${newSchedule.nome})`);
	addLog(log3);
	sessionStorage.setItem('Cinema', JSON.stringify(cinema));
}

function updateShow(oldSpettacolo, newSpettacolo) {
	let cinema = JSON.parse(sessionStorage.getItem('Cinema'));
	if (!cinema.attivo) throw new Error('Account non attivo');
	for (let x in cinema.shows) {
		if (JSON.stringify(cinema.shows[x]) == JSON.stringify(oldSpettacolo)) {
			cinema.shows[x] = newSpettacolo;
			sessionStorage.setItem('Cinema', JSON.stringify(cinema));
			let log = new Log(
				'Cinema',
				`Added new Show for ${newSpettacolo.nome}(${newSpettacolo.data}//${newSpettacolo.sala.numero}//${newSpettacolo.orario})`
			);
			addLog(log);
			return;
		}
	}
	addShow(newSpettacolo);
}

function getCinemaInfos() {
	let cinema = JSON.parse(sessionStorage.getItem('Cinema'));
	return cinema == null ? null : cinema.infos;
}

function getSale() {
	let cinema = JSON.parse(sessionStorage.getItem('Cinema'));
	return cinema == null ? [] : cinema.sale;
}

function getOwnedFilmsCinema() {
	let cinema = JSON.parse(sessionStorage.getItem('Cinema'));
	return cinema == null ? [] : cinema.filmsOwned;
}

function getScheduledFilms() {
	let cinema = JSON.parse(sessionStorage.getItem('Cinema'));
	return cinema == null ? [] : cinema.filmsScheduled;
}

function getActiveScheduledFilms() {
	let cinema = JSON.parse(sessionStorage.getItem('Cinema'));
	let output = [];
	let curr = new Date();
	for (let el of cinema.filmsScheduled) {
		if (compareDates(curr, new Date(el.dataScadenza)) >= 0) output.push(el);
	}
	return output;
}

function getPoliticheVendita() {
	let cinema = JSON.parse(sessionStorage.getItem('Cinema'));
	return cinema == null ? [] : cinema.politicheVendita;
}

function setPoliticheVendita(newPolitiche) {
	let cinema = JSON.parse(sessionStorage.getItem('Cinema'));
	cinema.politicheVendita = newPolitiche;
	sessionStorage.setItem('Cinema', JSON.stringify(cinema));
}

/**
 *
 * @param {*} cinemaName
 * @param {*} filmName
 * Given the cinemaName this will find the filmName is scheduled by the cinemaName cinema from today onwards
 * @throws Error
 * @returns Schedule
 */
function getSchedule(cinemaName, filmName) {
	let cinema = getCinema();
	if (cinema.infos.name != cinemaName) {
		throw new Error('Cinema non trovato');
	}
	let curr = new Date();
	for (let el of cinema.filmsScheduled) {
		let start = new Date(el.intervalloScheduled.start);
		if (el.src.endsWith(filmName) && compareDates(curr, start) >= 0) {
			return el;
		}
	}
	throw new Error('film non Programmato da questo cinema');
}

/**
 *
 * @param {*} cinemaName
 * @param {*} filmName
 * Given the cinemaName this will find the filmName is rentable from the cinemaName cinema from today onwards
 * @throws Error
 * @returns DataScadenza
 */
function getRentable(cinemaName, filmName) {
	let cinema = getCinema();
	if (cinema.infos.name != cinemaName) {
		throw new Error('Cinema non trovato');
	}
	let curr = new Date();
	for (let el of cinema.filmsOwned) {
		let end = new Date(el.dataScadenza);
		if (el.src.endsWith(filmName) && el.noleggiabile && compareDates(curr, end) <= 0) {
			return el.dataScadenza;
		}
	}
	throw new Error('film non Programmato da questo cinema');
}

/**
 *
 * @param {*} cinemaName
 * @param {*} filmName
 * @param {*} data
 * @param {*} orario
 * @param {*} numeroSala
 * This will create a new show given the specifications, this does not change the DB
 * @returns Show
 */
function createShow(cinemaName, filmName, data, orario, numeroSala) {
	let show = getSchedule(cinemaName, filmName);
	delete show.intervalloScheduled;
	delete show.orari;
	delete show.sale;
	let sale = getSale();
	let sala;
	for (let el of sale) {
		if (el.numero == numeroSala) {
			sala = JSON.parse(JSON.stringify(el));
			break;
		}
	}
	show.sala = sala;
	show.data = data;
	show.orario = orario;
	return show;
}

/**
 *
 * @param {*} cinemaName
 * @param {*} filmName
 * @param {*} data
 * @param {*} orario
 * @param {*} numeroSala
 * This will search for an existing show in the Cinema's shows if nothig is found a new show will be created
 * this does not change DB
 * @returns Show
 */
function getShow(cinemaName, filmName, orario, data, numeroSala) {
	//getCinema(cinemaName);
	let cinema = getCinema();
	if (!cinema.attivo) throw new Error('Account non attivo');
	let search = new Date(data);
	for (let el of cinema.shows) {
		let curr = new Date(el.data);
		if (el.src.endsWith(filmName) && el.sala.numero == numeroSala && compareDates(curr, search) == 0 && el.orario == orario) {
			return el;
		}
	}
	return createShow(cinemaName, filmName, data, orario, numeroSala);
}

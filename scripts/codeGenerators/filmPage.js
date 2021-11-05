/**
 *
 * @param {*} sala
 * @param {HTMLDivElement} board
 * Given a Sala and a div this functions will display the Sala into the div
 */
function generaMatriceSala(sala, board) {
	for (let row in sala) {
		for (let col in sala[row]) {
			if (sala[row][col] == null) board.innerHTML += `<i class="material-icons-round scale" id=${row}/${col} >stairs</i>`;
			else if (!sala[row][col]) board.innerHTML += `<i class="material-icons occupato" id=${row}/${col} >event_seat</i>`;
			else
				board.innerHTML += `<i class="material-icons free" id=${row}/${col} onclick="prenotaPosto(this,form,'prenota')" oncontextmenu="event.preventDefault();prenotaPosto(this,form,'ridotto');"" >event_seat</i>`;
		}
		board.innerHTML += '<br/>';
	}
}

//number of tickets in shopping cart
var prenotati = 0;

/**
 * define var intero with ticket full cost
 * define var ridotto with ticket reduced cost
 * add is a boolean to decide if the ticket is to be added or not
 * @param {*} form
 * @param {*} tipo
 */
function totalUpdater(form, tipo, add) {
	let costo = intero;
	if (tipo == 'ridotto') {
		costo = ridotto;
	}
	if (!add) costo = -costo;
	form['Total'].value = `${+form['Total'].value.split('€')[0] + +costo}€`;
}

/**
 *
 * @param {HTMLDivElement} seat
 * @param {HTMLFormElement} form
 * Given a Form and a Seat this will update the number of tickets pre-ordered
 * and will change the class of the seat accordingly
 */
function prenotaPosto(seat, form, type) {
	if (!seat.classList.value.includes('free')) {
		form['Quantity'].value = +form['Quantity'].value - 1;
		prenotati -= 1;
		if (seat.classList.value.includes('prenota')) {
			totalUpdater(form, 'prenota', false);
		} else {
			totalUpdater(form, 'ridotto', false);
		}
		seat.classList = 'material-icons free';
	} else if (prenotati < 10) {
		seat.classList.toggle('free');
		seat.classList.toggle(type);
		form['Quantity'].value = +form['Quantity'].value + 1;
		prenotati += 1;
		totalUpdater(form, type, true);
	}
}

/**
 *
 * @param {string} input
 * @param {HTMLFormElement} form
 * @param {HTMLDivElement} cinemaSelection
 * given an input this whill change the form's displayed elements and will trigger it's update
 */
function changer(input, form, cinemaSelection) {
	if (input === 'Al Cinema') {
		form['Orario'].classList.remove('invisible');
		form['Quantity'].classList.remove('invisible');
		form['Total'].classList.remove('invisible');
		form['salaNum'].classList.remove('invisible');
		form.querySelector('#sala').classList.remove('invisible');
		for (let el of form.getElementsByClassName('prenotaInfos')) {
			el.classList.remove('invisible');
		}
		updateSalaShow();
	} else {
		form['Orario'].classList.add('invisible');
		form['Quantity'].classList.add('invisible');
		form['Total'].classList.add('invisible');
		form['salaNum'].classList.add('invisible');
		for (let el of form.getElementsByClassName('prenotaInfos')) {
			el.classList.add('invisible');
		}
		form.querySelector('#sala').classList.add('invisible');
	}
	updateForm(form, cinemaSelection);
}

/**
 *
 * @param {HTMLDivElement} cinemaSelection
 * Function to append options to the given div
 */
function addCinemaNames(cinemaSelection) {
	let cinemas = getCinemaInfos();
	let cinema = createOption(cinemas.name);
	cinemaSelection.appendChild(cinema);
	let cinema2 = createOption('cinema...');
	cinemaSelection.appendChild(cinema2);
}
/**
 * define a const form with the form inside
 * @returns
 */
function prenota() {
	let isNoleggio = form['Type'].options[form['Type'].selectedIndex].value == 'Noleggio';
	let films = getOwnedFilmsCinema();
	let film;
	for (let el of films) {
		if (el.src.endsWith(filename)) {
			film = JSON.parse(JSON.stringify(el));
			break;
		}
	}
	delete film.dataScadenza;
	if (!isNoleggio) {
		prenotaTiket(film);
		return;
	}
	film.dataScadenza = form['Date'].value;
	addRentedFilm(film);
	form.submit();
}

/**
 * define a const form with the form inside
 * define a const orarioSelection for the time selection
 * define a const cinemaSelection for the cinema selection
 * @returns
 */
function prenotaTiket(film) {
	let alph = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let cinemaName = cinemaSelection.options[cinemaSelection.selectedIndex].value;
	let salaNum = form['salaNum'].options[form['salaNum'].selectedIndex].value;
	let newShow = JSON.parse(JSON.stringify(show));
	let ora = orarioSelection.options[orarioSelection.selectedIndex].value;
	let data = form['Date'].value;
	let posti = [];
	for (let el of form.querySelector('#sala').childNodes) {
		if (el.classList.value.includes('prenota') || el.classList.value.includes('ridotto')) {
			let col = el.id.split('/')[1];
			let row = el.id.split('/')[0];
			newShow.sala.sala[+row][+col] = false;
			let fila = '';
			if (row > 26) {
				fila += alph[row / 26];
				row = +row % 26;
			}
			fila += alph[row];
			posti.push(fila + col);
		}
	}
	film.posti = posti;
	film.ora = ora;
	film.data = data;
	film.cinema = cinemaName;
	film.sala = salaNum;
	addOwnedTicket(film);
	updateShow(show, newShow);
	form.submit();
}

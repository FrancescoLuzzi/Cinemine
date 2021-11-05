function aggiornaScheduledFilms(scheduledDisplayer) {
	let scheduledFilms = getScheduledFilms();
	clear(scheduledDisplayer);
	for (let el of scheduledFilms) {
		let scheduledFilm = createScheduledFilm(el);
		scheduledDisplayer.appendChild(scheduledFilm);
	}
}

function aggiornaLabelsFilms(labelDisplayer) {
	let films = getOwnedFilmsCinema();
	clear(labelDisplayer);
	for (let el of films) {
		let filmLabel = createFilmLabelCinema(el);
		labelDisplayer.appendChild(filmLabel);
	}
}

function setUpSala(salaSelezionata, board) {
	clear(salaSelezionata);
	clear(board);
	let sale = getSale();
	for (let el of sale) salaSelezionata.appendChild(createOption(el.numero));
	salaSelezionata.childNodes[0].selected = true;
	displaySala(salaSelezionata.options[salaSelezionata.selectedIndex].value, board);
}

function aggiornaSala(salaSelezionata, board) {
	clear(board);
	displaySala(salaSelezionata.options[salaSelezionata.selectedIndex].value, board);
}

function aggiornaPolitiche(Intero, intIntero, Ridotto, intRidotto) {
	for (let el of getPoliticheVendita()) {
		if (el.nome == 'intero') {
			Intero.value = el.prezzo;
			intIntero.value = el.intervallo;
		} else {
			Ridotto.value = el.prezzo;
			intRidotto.value = el.intervallo;
		}
	}
}

function modificaPolitiche(Intero, intIntero, Ridotto, intRidotto) {
	if (+Intero.value < 0 || +Ridotto.value < 0 || +Ridotto.value > +Intero.value || intIntero.value.length === 0 || intRidotto.value.length === 0)
		return;
	if (confirm('Sicuro/a di voler cambiare le politiche di vendita?')) {
		let politicheOut = [
			{ nome: 'intero', prezzo: +Intero.value, intervallo: intIntero.value },
			{ nome: 'ridotto', prezzo: +Ridotto.value, intervallo: intRidotto.value },
		];
		setPoliticheVendita(politicheOut);
	}
}
/**
 *
 * @param {*} sala
 * @param {HTMLDivElement} board
 * Given a Sala and a div this functions will display the Sala into the div
 */
function displaySala(numeroSala, board) {
	let sala;
	for (let el of getSale()) {
		if (el.numero == numeroSala) sala = el.sala;
	}
	for (let row in sala) {
		for (let col in sala[row]) {
			if (sala[row][col] == null) board.innerHTML += `<i class="material-icons-round scale" id=${row}/${col} >stairs</i>`;
			else board.innerHTML += `<i class="material-icons free" id=${row}/${col} >event_seat</i>`;
		}
		board.innerHTML += '<br/>';
	}
}

/**
 *
 * @param {*} sala
 * @param {HTMLDivElement} board
 * Given a Sala and a div this functions will display the Sala into the div
 */
function generaMatriceSala(sala, board) {
	for (let row in sala) {
		for (let col in sala[row]) {
			if (sala[row][col] == null) board.innerHTML += `<i class="material-icons-round scale" id=${row}/${col} onclick="switcher(this)" >stairs</i>`;
			else board.innerHTML += `<i class="material-icons free" id=${row}/${col} onclick="switcher(this)" >event_seat</i>`;
		}
		board.innerHTML += '<br/>';
	}
}

function switcher(seat) {
	if (seat.classList.value.includes('free')) seat.innerHTML = 'stairs';
	else seat.innerHTML = 'event_seat';
	seat.classList.toggle('scale');
	seat.classList.toggle('free');
	seat.classList.toggle('material-icons');
	seat.classList.toggle('material-icons-round');
}

function getCustomSala(rows, cols, salaContent) {
	let out = createBlandSala(rows, cols);
	for (let posto of salaContent.childNodes) {
		let col = +posto.id.split('/')[1];
		let row = +posto.id.split('/')[0];
		if (posto.classList.value.includes('scale')) {
			out[row][col] = null;
		}
	}
	return out;
}

function updateRowsCols(rows, cols, board) {
	clear(board);
	generaMatriceSala(createBlandSala(rows, cols), board);
}

function createAddSala() {
	let divvo = document.createElement('div');
	divvo.classList = 'infos';

	let content = document.createElement('div');
	content.classList = 'infosContent addSala';

	let salaContent = document.createElement('div');
	salaContent.classList = 'salaContent';
	//input number rows
	let labelRows = document.createElement('label');
	labelRows.innerHTML = 'File: ';
	labelRows.setAttribute('for', 'rows');

	let rows = document.createElement('input');
	rows.type = 'number';
	rows.id = 'rows';
	rows.min = 1;
	rows.value = '5';

	//input number column
	let labelCols = document.createElement('label');
	labelCols.innerHTML = 'Colonne: ';
	labelCols.setAttribute('for', 'cols');

	let cols = document.createElement('input');
	cols.type = 'number';
	cols.id = 'cols';
	cols.min = 1;
	cols.value = '5';

	updateRowsCols(+rows.value, +cols.value, salaContent);

	rows.onchange = () => {
		updateRowsCols(+rows.value, +cols.value, salaContent);
	};

	cols.onchange = () => {
		updateRowsCols(+rows.value, +cols.value, salaContent);
	};

	content.appendChild(labelRows);
	content.appendChild(rows);
	content.appendChild(labelCols);
	content.appendChild(cols);

	//input number numeroSala

	let labelNumero = document.createElement('label');
	labelNumero.innerHTML = 'Numero Sala: ';
	labelNumero.setAttribute('for', 'numSala');

	let numSala = document.createElement('input');
	numSala.type = 'number';
	numSala.id = 'numSala';
	numSala.min = 1;

	content.appendChild(labelNumero);
	content.appendChild(numSala);
	//div#board
	//buttonADD
	let buttonAdd = document.createElement('button');
	buttonAdd.classList = 'w3-button w3-round w3-grey w3-margin w3-border w3-border-black';
	buttonAdd.innerText = 'Aggiungi';
	buttonAdd.onclick = () => {
		let sala = getCustomSala(+rows.value, +cols.value, salaContent);
		let salaTmp = {
			sala: sala,
			numero: +numSala.value,
		};
		if (salaTmp.numero <= 0) {
			alert('numero della sala non supportato');
			return;
		}
		try {
			if (confirm('Sicuro/a della disposizione della sala?')) {
				addSala(salaTmp);
				aggiornaPagina();
				popup();
			}
		} catch {
			alert('Sala già esistente');
		}
	};
	content.appendChild(buttonAdd);
	//buttonClose
	let buttonClose = document.createElement('button');
	buttonClose.classList = 'w3-button w3-round w3-grey w3-margin w3-border w3-border-black';
	buttonClose.innerText = 'Chiudi';
	buttonClose.onclick = () => {
		popup();
	};
	content.appendChild(buttonClose);

	divvo.appendChild(content);
	divvo.appendChild(salaContent);
	return divvo;
}

/**
 *
 * @param {*} film
 * Given a filmSchedule information it returns a div displaying those informtions
 * @returns node
 */
function createScheduledFilm(film) {
	let filmImg = document.createElement('img');
	filmImg.src = film.src;
	filmImg.classList = 'imgFilm';
	let filmLabel = document.createElement('div');
	filmLabel.appendChild(filmImg);
	filmLabel.classList = 'filmLabel display-middle w3-round strong';
	filmLabel.appendChild(document.createElement('br'));
	filmLabel.appendChild(document.createTextNode(`Nome film: ${film.nome} `));
	filmLabel.appendChild(document.createTextNode(`Tipologa: ${film.tipologia} `));
	filmLabel.appendChild(document.createTextNode(`Durata Film: ${film.durata}min `));
	filmLabel.appendChild(document.createElement('br'));
	filmLabel.appendChild(document.createElement('br'));
	filmLabel.appendChild(document.createTextNode(`PROGRAMMAZIONE:`));
	filmLabel.appendChild(document.createElement('br'));
	filmLabel.appendChild(document.createTextNode(`sala: ${film.sale.map((el) => el.numero)}`));
	filmLabel.appendChild(document.createElement('br'));
	filmLabel.appendChild(document.createTextNode(`date programmazione: ${film.intervalloScheduled.start} fino al ${film.intervalloScheduled.end}`));
	filmLabel.appendChild(document.createElement('br'));
	filmLabel.appendChild(document.createTextNode(`orari: ${film.orari}`));
	return filmLabel;
}

/**
 *
 * @param {*} film
 * Given a film it will create a div usefull to prompt it's infos and cover image
 * and to give the possibility to create a schedule for it
 * @returns  node
 */
function createFilmLabelCinema(film) {
	let filmLabel = createFilmLabel(film);
	filmLabel.appendChild(document.createElement('br'));
	filmLabel.appendChild(document.createElement('br'));
	let button = document.createElement('button');
	button.innerHTML = 'Aggiungi <br/> programmazione';
	button.classList = 'w3-button w3-grey w3-round';
	button.onclick = () => {
		clearAndAppend(document.querySelector('#popup'), createAddProgrammazione(film));
		popup();
	};
	filmLabel.appendChild(button);
	return filmLabel;
}

/*POPUP addProgrammazione */
function createOra(div) {
	let orario = document.createElement('input');
	orario.type = 'time';
	orario.classList = 'orario w3-round w3-input';
	orario.oncontextmenu = (event) => {
		event.preventDefault();
		div.removeChild(orario);
	};
	div.appendChild(orario);
}

/**
 *
 * @param {*} film
 * @param {*} startDate
 * @param {*} endDate
 * @param {*} orariDiv
 * @param {*} sale
 * Control function used by addButton in createAddProgrammazione's div
 * @returns void
 */
function controlAddProgrammazione(film, startDate, endDate, orariDiv, sale) {
	let error = false;
	let errorMessage = '';
	if (startDate.value == '') {
		error = true;
		errorMessage += 'StartDate, ';
	}
	if (endDate.value == '') {
		error = true;
		errorMessage += 'EndDate, ';
	}
	if (orariDiv.children.length === 0) {
		error = true;
		errorMessage += 'Orario, ';
	}
	if (error) {
		alert(errorMessage + 'mancante/i');
		return;
	}
	let intervalloScheduled = {
		start: startDate.value,
		end: endDate.value,
	};
	let orari = [];
	for (let el of orariDiv.childNodes) {
		orari.push(el.value);
	}
	let salaNmbr = sale.options[sale.selectedIndex].value;
	let sala;
	for (let el of getSale()) {
		if (el.numero == salaNmbr) {
			sala = JSON.parse(JSON.stringify(el));
			break;
		}
	}
	let filmTmp = JSON.parse(JSON.stringify(film));
	filmTmp.intervalloScheduled = intervalloScheduled;
	filmTmp.sala = sala;
	filmTmp.orari = orari;
	delete filmTmp.dataScadenza;
	try {
		addScheduledFilm(filmTmp);
		aggiornaScheduledFilms(document.getElementById('scheduledDisplayer'));
		popup();
	} catch (e) {
		alert(e.message);
	}
}

/**
 *
 * @param {*} film
 * Given the film informations, this will create a div node that will
 * be used to add a schedule for that film
 * @returns node
 */
function createAddProgrammazione(film) {
	//BIG DIV
	let divvo = document.createElement('div');
	divvo.classList = 'infos strong';
	//LEFT IMAGE
	let filmImg = document.createElement('img');
	filmImg.src = film.src;
	filmImg.classList = 'imgFilm';
	divvo.appendChild(filmImg);

	//RIGHT CONTENT
	let content = document.createElement('div');
	content.classList = 'infosContent';
	{
		//STARTING AND ENDING DATES
		let startDate = document.createElement('input');
		startDate.type = 'date';
		startDate.classList = 'w3-round w3-input';
		startDate.id = 'startDate';

		let labelStartingDate = document.createElement('label');
		labelStartingDate.textContent = 'Inizio programmazione';
		labelStartingDate.setAttribute('for', 'startDate');

		let endDate = document.createElement('input');
		endDate.classList = 'w3-round w3-input';
		endDate.type = 'date';
		endDate.id = 'endDate';

		let labelEndingDate = document.createElement('label');
		labelEndingDate.textContent = 'Fine programmazione';
		labelEndingDate.setAttribute('for', 'endDate');

		startDate.onchange = () => {
			if (startDate.value) endDate.min = startDate.value;
		};

		endDate.onchange = () => {
			if (endDate.value) startDate.max = endDate.value;
		};

		content.appendChild(labelStartingDate);
		content.appendChild(startDate);
		content.appendChild(labelEndingDate);
		content.appendChild(endDate);

		//PLANNED HOURS
		let labelOrari = document.createElement('label');
		labelOrari.textContent = 'Orari programmazione';
		labelOrari.setAttribute('for', 'orari');

		let addOrario = document.createElement('span');
		addOrario.classList = 'material-icons-outlined addOrario';
		addOrario.innerHTML = 'more_time';
		addOrario.onclick = () => {
			createOra(orariDiv);
		};

		let orariDiv = document.createElement('div');
		orariDiv.classList = 'orari w3-round';
		orariDiv.id = 'orari';

		content.appendChild(labelOrari);
		content.appendChild(addOrario);
		content.appendChild(orariDiv);

		createOra(orariDiv);

		//SALA SELECTION
		let sale = document.createElement('select');
		sale.id = 'sale';
		sale.classList = 'w3-round w3-select';

		let labelSale = document.createElement('label');
		labelSale.textContent = 'Seleziona Sala';
		labelSale.setAttribute('for', 'sale');

		for (let el of getSale()) {
			let sala = createOption(el.numero);
			sale.appendChild(sala);
		}
		content.appendChild(labelSale);
		content.appendChild(sale);

		//CLOSE BUTTON
		let buttonClose = document.createElement('button');
		buttonClose.classList = 'w3-button w3-round w3-grey w3-margin w3-border w3-border-black';
		buttonClose.innerText = 'Chiudi';
		buttonClose.onclick = () => {
			popup();
		};
		content.appendChild(buttonClose);

		//ADD BUTTON
		let buttonAdd = document.createElement('button');
		buttonAdd.classList = 'w3-button w3-round w3-grey w3-margin w3-border w3-border-black';
		buttonAdd.innerText = 'Aggiungi';
		buttonAdd.onclick = () => {
			controlAddProgrammazione(film, startDate, endDate, orariDiv, sale);
		};
		content.appendChild(buttonAdd);
	}

	divvo.appendChild(content);

	return divvo;
}

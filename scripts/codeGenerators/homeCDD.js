/**
 * 	This function will create a div that has a button that will
 * 	open a popup which starts the ADD FILM CDD process
 * @returns node
 */
function createAddFilmLabel() {
	let addLabel = document.createElement('div');
	addLabel.classList = 'filmLabel display-middle w3-round strong';
	addLabel.appendChild(document.createTextNode(`Aggiungi un nuovo film`));
	addLabel.appendChild(document.createElement('br'));
	let addButton = document.createElement('button');
	addButton.classList = 'w3-button w3-round w3-grey w3-margin w3-border w3-border-black';
	let add = document.createElement('span');
	add.classList = 'material-icons-outlined addFilm w3-round';
	add.innerHTML = 'library_add';
	add.onclick = () => {
		clearAndAppend(document.querySelector('#popup'), createAddFilmCDD());
		popup();
	};
	addButton.appendChild(add);
	addLabel.appendChild(addButton);
	return addLabel;
}

/* POPUP ADD PERMESSO */

/**
 * @param {HTMLFormElement} form
 * Given a form, prepares data from the form to be fed to createConfirmAddPermission
 *
 */
function prepareDataPermesso(form) {
	let filmName = form['Film'].value;
	let cinemaName = form['Cinema'].value;
	let tipoPermesso = form['Permesso'].options[form['Permesso'].selectedIndex].value;
	let endDate = form['endDate'].value;
	let permesso = {
		film: filmName,
		cinema: cinemaName,
		permission: tipoPermesso,
		dataScadenza: endDate,
	};
	clearAndAppend(document.querySelector('#popup'), createConfirmAddPermission(permesso));
	popup();
}

/**
 *
 * @param {*} permesso
 * Create a div that will ask the CDD to confirm the new Permission informations
 * @returns node
 */
function createConfirmAddPermission(permesso) {
	let divvo = document.createElement('div');
	divvo.classList = 'infos strong';
	let title = document.createElement('h2');
	title.innerHTML = `Sei sicuro di voler proseguire?`;
	divvo.appendChild(title);
	divvo.appendChild(document.createElement('br'));
	divvo.appendChild(document.createTextNode(`Cinema: ${permesso.cinema}`));
	divvo.appendChild(document.createElement('br'));
	divvo.appendChild(document.createTextNode(`Film: ${permesso.film}`));
	divvo.appendChild(document.createElement('br'));
	divvo.appendChild(document.createTextNode(`Fine permesso: ${permesso.dataScadenza}`));
	divvo.appendChild(document.createElement('br'));
	divvo.appendChild(document.createTextNode(`Con permesso: ${permesso.permission}`));
	divvo.appendChild(document.createElement('br'));

	let closeButton = document.createElement('button');
	closeButton.classList = 'w3-button w3-round w3-grey w3-border w3-border-black';
	closeButton.innerText = 'Chiudi';
	closeButton.onclick = () => {
		popup();
	};
	divvo.appendChild(closeButton);

	let addButton = document.createElement('button');
	addButton.classList = 'w3-button w3-round w3-grey w3-border w3-border-black';
	addButton.innerHTML = 'Aggiungi permesso';
	addButton.onclick = () => {
		addPermission(permesso);
		popup();
	};
	divvo.appendChild(addButton);

	return divvo;
}

/**
 *
 * @param {HTMLInputElement} file
 * @param {HTMLImageElement} img
 * On file change this gets the file src and changes the img.src
 */
function loadNewImage(file, img) {
	var files = file.files;
	if (!files.length) {
		alert('Please select a file!');
		return;
	}

	let fileSrc = files[0];
	img.src = `../images/${fileSrc.name}`;
}

/**
 *
 * @param {*} filmName
 * @param {*} durata
 * @param {*} src
 * @param {*} risp
 * Controlls all Data necessary to create a newFilm
 */
function getDataAndAddFilm(filmName, durata, src, tipologie) {
	if (src.endsWith('/images/search.png')) return;
	if (tipologie.length === 0) return;
	let newFilm = {
		nome: filmName,
		durata: durata,
		src: src,
		tipologia: [...tipologie],
	};
	addOwnedFilmCDD(newFilm);
	aggiornaPagina();
}

/**
 * form per l'aggiunta di un nuovo film da parte di una CDD
 * @returns node
 */
function createAddFilmCDD() {
	let divvo = document.createElement('div');
	divvo.classList = 'infos strong';

	let img = document.createElement('img');
	img.src = '../images/search.png';
	img.classList = 'imgFilm';
	divvo.appendChild(img);

	let content = document.createElement('div');
	content.classList = 'infosContent';

	let filmNameLable = document.createElement('label');
	filmNameLable.innerHTML = 'Nome film:';
	filmNameLable.setAttribute('for', 'filmName');

	let filmName = document.createElement('input');
	filmName.type = 'text';
	filmName.id = 'filmName';

	content.appendChild(filmNameLable);
	content.appendChild(filmName);

	let file = document.createElement('input');
	file.innerHTML = 'Seleziona copertina';
	file.type = 'file';
	file.accept = 'image/*';
	file.onchange = () => {
		loadNewImage(file, img);
	};

	content.appendChild(file);

	let filmDurataLable = document.createElement('label');
	filmDurataLable.innerHTML = 'Durata film (min):';
	filmDurataLable.setAttribute('for', 'filmDurata');

	let durata = document.createElement('input');
	durata.type = 'number';
	durata.min = 0;
	durata.id = 'filmDurata';

	content.appendChild(filmDurataLable);
	content.appendChild(durata);

	let filmTipologiaLable = document.createElement('label');
	filmTipologiaLable.innerHTML = 'Tipologia film:';
	filmTipologiaLable.setAttribute('for', 'filmTipologia');

	let tipologia = document.createElement('select');
	tipologia.id = 'filmTipologia';
	tipologia.multiple = true;
	tipologia.size = '3';

	let tipologie = getTipologie();
	for (let el of tipologie) {
		tipologia.appendChild(createOptionMultiple(el));
	}

	content.appendChild(filmTipologiaLable);
	content.appendChild(tipologia);

	//CLOSE BUTTON
	let buttonClose = document.createElement('button');
	buttonClose.classList = 'w3-button w3-grey w3-margin w3-border w3-border-black';
	buttonClose.innerText = 'Chiudi';
	buttonClose.onclick = () => {
		popup();
	};
	content.appendChild(buttonClose);

	//ADD BUTTON
	let buttonAdd = document.createElement('button');
	buttonAdd.classList = 'w3-button w3-grey w3-margin w3-border w3-border-black';
	buttonAdd.innerText = 'Aggiungi';
	buttonAdd.onclick = () => {
		let risp = [];
		for (let el of tipologia.selectedOptions) {
			risp.push(el.value);
		}
		getDataAndAddFilm(filmName.value, durata.value, img.src, risp);
		popup();
	};
	content.appendChild(buttonAdd);

	divvo.appendChild(content);

	return divvo;
}

function createConfirmDeletePermission(permesso) {
	let divvo = document.createElement('div');
	divvo.classList = 'infos strong';
	let title = document.createElement('h2');
	title.innerHTML = `Sei sicuro di voler proseguire?`;
	divvo.appendChild(title);
	divvo.appendChild(document.createElement('br'));
	divvo.appendChild(document.createTextNode(`Cinema: ${permesso.cinema}`));
	divvo.appendChild(document.createElement('br'));
	divvo.appendChild(document.createTextNode(`Film: ${permesso.film.nome}`));
	divvo.appendChild(document.createElement('br'));
	divvo.appendChild(document.createTextNode(`Fine permesso: ${permesso.dataScadenza}`));
	divvo.appendChild(document.createElement('br'));
	divvo.appendChild(document.createTextNode(`Con permesso: ${permesso.permission}`));
	divvo.appendChild(document.createElement('br'));

	let deleteButton = document.createElement('button');
	deleteButton.classList = 'w3-button w3-round w3-grey w3-border w3-border-black';
	deleteButton.innerHTML = 'Rimuovi permesso';
	deleteButton.onclick = () => {
		deletePermission(permesso);
		clear(document.getElementById('cinemaDisplayer'));
		popup();
	};
	divvo.appendChild(deleteButton);

	let closeButton = document.createElement('button');
	closeButton.classList = 'w3-button w3-round w3-grey w3-border w3-border-black';
	closeButton.innerText = 'Chiudi';
	closeButton.onclick = () => {
		popup();
	};
	divvo.appendChild(closeButton);

	return divvo;
}

/**
 *
 * @param {*} permission
 * Given a permission this will return the visual representation of it
 * @returns {HTMLDivElement} div
 */
function createPermissionLabel(permission) {
	let divvo = document.createElement('div');
	divvo.classList = 'permission w3-round w3-padding';
	//display all infos
	divvo.appendChild(document.createTextNode(`Cinema: ${permission.cinema}`));
	divvo.appendChild(document.createElement('br'));
	divvo.appendChild(document.createTextNode(`Film: ${permission.film.nome}`));
	divvo.appendChild(document.createElement('br'));
	divvo.appendChild(document.createTextNode(`Fine permesso: ${permission.dataScadenza}`));
	divvo.appendChild(document.createElement('br'));
	divvo.appendChild(document.createTextNode(`Con permesso: ${permission.permission}`));
	divvo.appendChild(document.createElement('br'));
	//button to cancel the permission-->pops up confirmation

	//BUTTON CLOSE
	let closeButton = document.createElement('button');
	closeButton.classList = 'w3-button w3-round w3-grey w3-border w3-border-black';
	closeButton.innerText = 'Delete';
	closeButton.onclick = () => {
		clearAndAppend(document.querySelector('#popup'), createConfirmDeletePermission(permission));
		popup();
	};
	divvo.appendChild(closeButton);
	return divvo;
}

/**
 *
 * @param {String} cinemaName
 * @param {HTMLDivElement} div
 * Given a cinemaName this will search for all permission to that specific cinema,
 * then displays the result on the div
 */
function searchPermission(cinemaName, div) {
	let permissions = getActivePermissions();
	clear(div);
	for (let el of permissions) {
		if (el.cinema == cinemaName) div.appendChild(createPermissionLabel(el));
	}
}

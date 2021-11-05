class Log {
	constructor(cliente, azione) {
		this.data = new Date().toISOString();
		this.client = cliente;
		this.action = azione;
	}

	toString() {
		return `data: ${this.data}_client:${this.client}_action:${this.action}`;
	}
}

/**
 *
 * @param {Date} date1
 * @param {Date} date2
 * number==0 equal
 * number>0 date1>date2
 * number<0 date1<date2
 * @returns number
 */
function compareDates(date1, date2) {
	let year1 = date1.getFullYear();
	let year2 = date2.getFullYear();
	let month1 = date1.getMonth();
	let month2 = date2.getMonth();
	let day1 = date1.getDate();
	let day2 = date2.getDate();
	if (year1 != year2) return year1 - year2;
	if (month1 != month2) return month1 - month2;
	if (day1 != day2) return day1 - day2;
	return 0;
}

/**
 *
 * @param {Date} date
 */
function formatDate(date) {
	let month = String(date.getMonth() + 1);
	let day = String(date.getDate());
	if (day < 10) {
		day = '0' + day;
	}
	if (month < 10) {
		month = '0' + month;
	}
	return `${date.getFullYear()}-${month}-${day}`;
}
/**
 *
 * @param {*} info
 * Given a Client info this will return a div that display them
 * @returns node
 */
function createInfos(info) {
	let divvo = document.createElement('div');
	divvo.classList = 'infos strong';
	divvo.appendChild(document.createTextNode(`Username: ${info.name}`));
	divvo.appendChild(document.createElement('br'));
	divvo.appendChild(document.createTextNode(`Luogo: ${info.luogo}`));
	divvo.appendChild(document.createElement('br'));
	divvo.appendChild(document.createTextNode(`Descrizione: ${info.descrizione}`));
	divvo.appendChild(document.createElement('br'));
	divvo.appendChild(document.createTextNode(`Numero di telefono: ${info.numTelefono}`));
	if (info.tipologiePreferite != undefined) {
		divvo.appendChild(document.createElement('br'));
		divvo.appendChild(document.createTextNode(`Tipologie preferite: ${info.tipologiePreferite}`));
	}
	divvo.appendChild(document.createElement('br'));
	let button = document.createElement('button');
	button.classList = 'w3-button w3-round w3-grey w3-border w3-border-black';
	button.innerText = 'Chiudi';
	button.onclick = () => {
		popup();
	};
	divvo.appendChild(button);
	return divvo;
}

/**
 *
 * @param {HTMLElement} parent
 * This function will remove all parent's childNodes
 */
function clear(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.lastChild);
	}
}
/**
 *
 * @param {HTMLElement} parent
 * @param {HTMLElement} child
 * This function will remove all parent's childNodes and append child
 */
function clearAndAppend(parent, child) {
	if (parent.childNodes.length !== 0) {
		clear(parent);
	}
	parent.appendChild(child);
}

/**
 *
 * @param {string} val
 * Given val this will return an option displaying and having as value val
 */
function createOption(val) {
	let option = document.createElement('option');
	option.classList = 'w3-round';
	option.value = val;
	option.innerHTML = val;
	return option;
}

function createOptionMultiple(val) {
	let div = createOption(val);
	div.selected = false;
	div.onmousedown = (e) => {
		e.preventDefault();
		div.selected = !div.selected;
	};
	return div;
}

function addLog(log) {
	let logs = JSON.parse(sessionStorage.getItem('Log'));
	logs.push(log);
	sessionStorage.setItem('Log', JSON.stringify(logs));
}

function isLogged(username) {
	let logged = sessionStorage.getItem('logged');
	if (logged != username) {
		alert('non sei loggato correttamente!');
		window.location.href = `./login.html`;
	}
}

let traducer = {
	Beppone78: 'User',
	Cinepark: 'Cinema',
	Medusa: 'CDD',
};

function attivaCliente(nome) {
	let find = traducer[nome];
	let client = JSON.parse(sessionStorage.getItem(find));
	client.attivo = true;
	sessionStorage.setItem(find, JSON.stringify(client));
}

function labelLog(log) {
	let divvo = document.createElement('div');
	divvo.classList = 'activate';
	divvo.innerHTML = `<strong>Cliente:</strong> ${log.client}  <strong>Data:</strong> ${log.data.split('T')[0]}  <strong>Ora:</strong> 
	${log.data.split('T')[1].split('.')[0]}  <strong>Azione:</strong> ${log.action}`;
	return divvo;
}

function clientLogs(clientName, out) {
	if (clientName.trim() == '') {
		alert('Immetti clientName');
		return;
	}
	let logs = getClientLogs(clientName);
	clear(out);
	for (let el of logs) {
		out.appendChild(labelLog(el));
	}
}

function logsDate(date, out) {
	if (date.trim() == '') {
		alert('Immetti data');
		return;
	}
	let logs = getLogsPrecise(new Date(date));
	clear(out);
	for (let el of logs) {
		out.appendChild(labelLog(el));
	}
}

function logsBetweenDates(start, end, out) {
	if (start.trim() == '' || end.trim() == '') {
		alert('Immetti data/e');
		return;
	}
	let logs = getLogsBetween(new Date(start), new Date(end));
	clear(out);
	for (let el of logs) {
		out.appendChild(labelLog(el));
	}
}

function labelActive(acc) {
	let divvo = document.createElement('div');
	divvo.classList = 'activate';
	divvo.innerHTML = `<strong>Cliente:</strong> ${acc.infos.name}  <strong>Data:</strong> ${acc.attivo ? 'Attivo' : 'Bloccato'}`;

	let button = document.createElement('button');
	button.classList = 'w3-button w3-round w3-border w3-border-black';
	button.onclick = () => {
		if (!acc.attivo) {
			attivaCliente(acc.infos.name);
			updateAccounts(document.getElementById('users'), document.getElementById('other'));
		} else {
			blockCliente(traducer[acc.infos.name]);
			updateAccounts(document.getElementById('users'), document.getElementById('other'));
		}
	};

	button.innerHTML = acc.attivo ? 'Blocca' : 'Attiva';
	divvo.appendChild(button);
	return divvo;
}

function updateAccounts(userDis, otherDis) {
	clear(userDis);
	clear(otherDis);
	let users = getUser();
	let CDD = getCDD();
	let cinema = getCinema();
	userDis.appendChild(labelActive(users));
	otherDis.appendChild(labelActive(cinema));
	otherDis.appendChild(labelActive(CDD));
}

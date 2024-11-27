function logout(username) {
	let log = new Log(username, 'Logged Out');
	addLog(log);
	sessionStorage.removeItem('logged');
	window.location.href = './home.html';
}
let tentativiRimastiUser = 5;

function isActive(Client) {
	return JSON.parse(sessionStorage.getItem(Client)).attivo;
}

function login(form) {
	let username = form.querySelector('#username').value;

	if (username != 'Cinema' && username != 'User' && username != 'CasaDiDistribuzione' && username != 'AddettoSicurezza') {
		document.getElementById('password').value = '';
		document.getElementById('username').value = '';
		alert('Username o password errati!');
		return;
	}

	let password = document.getElementById('password').value;
	if (username == 'Cinema') {
		if (!isActive('Cinema')) {
			alert("account Bloccato! Contatta l'addetto alla sicurezza");
			return;
		}
		form.action = './homeCinema.html';
	} else if (username == 'CasaDiDistribuzione') {
		if (!isActive('CDD')) {
			alert("account Bloccato! Contatta l'addetto alla sicurezza");
			return;
		}
		form.action = './homeCDD.html';
	} else if (username == 'User') {
		if (!isActive('User')) {
			alert("account Bloccato! Contatta l'addetto alla sicurezza");
			return;
		}
		if (password == 'aaa') form.action = './homeUser.html';
		else {
			tentativiRimastiUser -= 1;
			if (tentativiRimastiUser <= 0) {
				blockCliente('User');
				alert("account Bloccato! Contatta l'addetto alla sicurezza");
			}
			return;
		}
	} else if (username == "AddettoSicurezza") {
		form.action = './homeSicurezza.html';
	}
	else{
		alert("Nessun account riconosciuto")
		return
	}
	let log = new Log(username, 'Logged In');
	addLog(log);
	sessionStorage.setItem('logged', username);
	window.location.href = form.action;
}

function blockCliente(Cliente) {
	let client = JSON.parse(sessionStorage.getItem(Cliente));
	client.attivo = false;
	let log = new Log(Cliente, 'Number of login tries exceeded');
	addLog(log);
	sessionStorage.setItem(Cliente, JSON.stringify(client));
}

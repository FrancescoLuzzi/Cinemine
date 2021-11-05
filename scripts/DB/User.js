function getUser() {
	return JSON.parse(sessionStorage.getItem('User'));
}

function addRentedFilm(newFilm) {
	let user = JSON.parse(sessionStorage.getItem('User'));
	if (!user.attivo) throw new Error('Account non attivo');
	user.filmsRented.push(newFilm);
	let log = new Log('User', `Added rented Film ${newFilm.nome}`);
	addLog(log);
	sessionStorage.setItem('User', JSON.stringify(user));
}

function addOwnedTicket(newTicket) {
	let user = JSON.parse(sessionStorage.getItem('User'));
	if (!user.attivo) throw new Error('Account non attivo');
	user.ticketsOwned.push(newTicket);
	let log = new Log('User', `Added new Ticket ${newTicket.nome}`);
	addLog(log);
	sessionStorage.setItem('User', JSON.stringify(user));
}

function getUserInfos() {
	let user = JSON.parse(sessionStorage.getItem('User'));
	return user == null ? null : user.infos;
}

function getRentedFilms() {
	let user = JSON.parse(sessionStorage.getItem('User'));
	return user == null ? [] : user.filmsRented;
}

function getOwnedTickets() {
	let user = JSON.parse(sessionStorage.getItem('User'));
	return user == null ? [] : user.ticketsOwned;
}

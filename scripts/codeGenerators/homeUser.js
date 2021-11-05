/**
 *
 * @param {*} ticket
 * Given a ticket information this function will return a div that displays them
 * @returns node
 */
function createTicket(ticket) {
	let node = document.createElement('div');
	node.appendChild(
		document.createTextNode(
			`Ticket per film ${ticket.nome}, in data ${ticket.data} ed ora ${ticket.ora} al cinema ${ticket.cinema} sala n°${ticket.sala}, posto/i ${ticket.posti}`
		)
	);
	node.classList = 'ticket w3-round';
	return node;
}

/**
 *
 * @param {*} rental
 * Given a rental information this function will return a div that displays them
 * @returns node
 */
function createRentedFilm(rental) {
	let node = document.createElement('div');
	node.appendChild(document.createTextNode(`Noleggio per film ${rental.nome}, di durata ${rental.durata}, fino al giorno ${rental.dataScadenza}`));
	node.classList = 'ticket w3-round';
	return node;
}

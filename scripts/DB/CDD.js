function getCDD() {
	return JSON.parse(sessionStorage.getItem('CDD'));
}

function addOwnedFilmCDD(newFilm) {
	let cdd = JSON.parse(sessionStorage.getItem('CDD'));
	if (!cdd.attivo) throw new Error('Account non attivo');
	cdd.filmsOwned.push(newFilm);
	let log = new Log('CasaDiDistribuzione', `Added Owned Film`);
	addLog(log);
	sessionStorage.setItem('CDD', JSON.stringify(cdd));
}

function addPermission(permission) {
	let cdd = JSON.parse(sessionStorage.getItem('CDD'));
	if (!cdd.attivo) throw new Error('Account non attivo');
	let curr = new Date(permission.dataScadenza);
	for (let el of cdd.permissions) {
		let old = new Date(el.dataScadenza);
		old.setMonth(old.getMonth() + 1);
		if (el.cinema == permission.cinema && el.film == permission.film && compareDates(old, curr) < 0) {
			let log = new Log('CasaDiDistribuzione', `Failed to add Permission(${permission.film})`);
			addLog(log);
			throw new Error('Permesso già presente, ritenta');
		}
	}
	cdd.permissions.push(permission);
	sessionStorage.setItem('CDD', JSON.stringify(cdd));
	let film = getFilmCDD(permission.film);
	if (film != null) {
		let noleggiabile = false;
		if (permission.permission == 'Both') noleggiabile = true;
		film.noleggiabile = noleggiabile;
		film.dataScadenza = permission.dataScadenza;
		let log = new Log('CasaDiDistribuzione', `Added Permission to ${permission.cinema}(${permission.film})`);
		addLog(log);
		addOwnedFilmCinema(film);
	}
}

function deletePermission(permission) {
	let cdd = JSON.parse(sessionStorage.getItem('CDD'));
	if (!cdd.attivo) throw new Error('Account non attivo');
	for (let el of cdd.permissions) {
		if (JSON.stringify(el) == JSON.stringify(permission)) {
			el.dataScadenza = formatDate(new Date());
			sessionStorage.setItem('CDD', JSON.stringify(cdd));
			return;
		}
	}
	throw new Error('Permesso inesistente');
}

function getCDDInfos() {
	let cdd = JSON.parse(sessionStorage.getItem('CDD'));
	return cdd == null ? null : cdd.infos;
}

function getOwnedFilmsCDD() {
	let cdd = JSON.parse(sessionStorage.getItem('CDD'));
	return cdd == null ? [] : cdd.filmsOwned;
}

function getFilmCDD(filmName) {
	let films = getOwnedFilmsCDD();
	for (let el of films) {
		if (el.nome == filmName) return JSON.parse(JSON.stringify(el));
	}
	return null;
}

function getPermissions() {
	let cdd = JSON.parse(sessionStorage.getItem('CDD'));
	return cdd == null ? [] : cdd.permissions;
}

function getActivePermissions() {
	let cdd = JSON.parse(sessionStorage.getItem('CDD'));
	return cdd == null ? [] : cdd.permissions.filter((el) => compareDates(new Date(el.dataScadenza), new Date()) > 0);
}

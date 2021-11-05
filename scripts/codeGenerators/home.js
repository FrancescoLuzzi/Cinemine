function createImgWithRedirect(src) {
	let filmImg = document.createElement('img');
	filmImg.src = src;
	filmImg.classList = 'imgFilm';
	filmImg.onclick = () => {
		redirect(src);
	};
	return filmImg;
}
/**
 *
 * @param {*} film
 * Given a film information this will create a slide that will display the cover image of the film
 * and its informations
 * @returns node
 */
function createFilmSlide(film) {
	let filmImg = createImgWithRedirect(film.src);
	let filmDiv = document.createElement('div');
	filmDiv.appendChild(filmImg);
	filmDiv.classList = 'mySlides w3-animate-right display-middle strong';
	filmDiv.appendChild(document.createElement('br'));
	filmDiv.appendChild(document.createTextNode(`Nome film: ${film.nome}`));
	filmDiv.appendChild(document.createElement('br'));
	filmDiv.appendChild(document.createTextNode(`Tipologa: ${film.tipologia}`));
	filmDiv.appendChild(document.createElement('br'));
	filmDiv.appendChild(document.createTextNode(`Durata Film: ${film.durata}min`));
	return filmDiv;
}

/**
 *
 * @param {*} film
 * Given a film information this will create a label that will display the cover image of the film
 * (insmall) and its informations
 * @returns node
 */
function createFilmLabel(film) {
	let filmImg = createImgWithRedirect(film.src);
	let filmLabel = document.createElement('div');
	filmLabel.appendChild(filmImg);
	filmLabel.classList = 'filmLabel display-middle w3-round strong';
	filmLabel.appendChild(document.createElement('br'));
	filmLabel.appendChild(document.createTextNode(`Nome film: ${film.nome} `));
	filmLabel.appendChild(document.createTextNode(`Tipologia/e: ${film.tipologia} `));
	filmLabel.appendChild(document.createTextNode(`Durata Film: ${film.durata}min `));
	return filmLabel;
}

function createFilmSearch(film, cinemaName) {
	let out = createFilmLabelWithRedirect(film);
	out.appendChild(document.createElement('br'));
	out.appendChild(document.createTextNode(`Cinema: ${cinemaName}`));
	return out;
}

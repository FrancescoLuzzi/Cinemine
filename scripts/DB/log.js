//ideally clientName should be clientID

/**
 *
 * @param {String} clientName
 * @returns {Array<Log>} logs
 */
function getClientLogs(clientName) {
	let logs = JSON.parse(sessionStorage.getItem('Log'));
	let output = [];
	for (let el of logs) {
		if (el.client == clientName) {
			output.push(el);
		}
	}
	return output;
}

/**
 *
 * @param {Date} start
 * @param {Date} end
 * @returns {Array<Log>} logs
 */
function getLogsBetween(start, end) {
	let logs = JSON.parse(sessionStorage.getItem('Log'));
	let output = [];
	for (let el of logs) {
		let curr = new Date(el.data);
		if (compareDates(start, curr) <= 0 && compareDates(curr, end) <= 0) {
			output.push(el);
		}
	}
	return output;
}

/**
 *
 * @param {Date} start
 * @param {Date} end
 * @returns {Array<Log>} logs
 */
function getLogsPrecise(date) {
	let logs = JSON.parse(sessionStorage.getItem('Log'));
	let output = [];
	for (let el of logs) {
		let curr = new Date(el.data);
		if (compareDates(curr, date) == 0) {
			output.push(el);
		}
	}
	return output;
}

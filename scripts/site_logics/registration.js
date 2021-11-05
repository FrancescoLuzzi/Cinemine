function checkPassword(form) {
	let password = document.getElementById('pwp').value;
	let repeatedPwd = document.getElementById('rpwp').value;
	console.log(password === repeatedPwd);
	if (password === repeatedPwd) {
		form.submit();
		return true;
	} else {
		alert('le password non coincidono');
		document.getElementById('pwp').value = '';
		document.getElementById('rpwp').value = '';
	}
	return false;
}

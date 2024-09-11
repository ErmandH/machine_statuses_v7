export function getDataArray() {
	return localStorage.getItem('data') ? localStorage.getItem('data').split(',') : null
}

export function getSettingsArray() {
	return localStorage.getItem('settings') ? localStorage.getItem('settings').split(',') : null
}
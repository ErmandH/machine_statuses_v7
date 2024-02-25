export function getDataArray(){
	return localStorage.getItem('data').split(',');
}

export function getSettingsArray(){
	return localStorage.getItem('settings').split(',');
}
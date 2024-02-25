export default function isMotorsDisabled() : boolean {
	const dataArray = localStorage.getItem('settings').split(',');
	const motorIndex = 20;
	const motorCount = Number(dataArray[motorIndex])
	for (let index = 0; index < motorCount; index++) {
		if (dataArray[motorIndex + 1 + index] === '0'){
			return true;
		}
	}
	return false;
}
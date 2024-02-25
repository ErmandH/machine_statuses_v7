export default function getNumberOfUnit() : number{
	const dataArray = localStorage.getItem('settings').split(',')
	return Number(dataArray[5])
}
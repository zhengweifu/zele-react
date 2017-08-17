export default () => {
	const data = new Date();
	return `${data.getFullYear()}${data.getMonth() + 1}${data.getDate()}${data.getHours()}${data.getMinutes()}${data.getSeconds()}`;
};

export const TimeInRegion = (sYear, sMonth, sDate, sHours, sMinutes, sSeconds, eYear, eMonth, eDate, eHours, eMinutes, eSeconds) => {
	let startDate = new Date(), endDate = new Date();
	startDate.setYear(parseInt(sYear));
	startDate.setMonth(parseInt(sMonth) - 1);
	startDate.setDate(parseInt(sDate));
	startDate.setHours(parseInt(sHours));
	startDate.setMinutes(parseInt(sMinutes) - 1);
	startDate.setSeconds(parseInt(sSeconds) - 1);

	endDate.setYear(parseInt(eYear));
	endDate.setMonth(parseInt(eMonth) - 1);
	endDate.setDate(parseInt(eDate));
	endDate.setHours(parseInt(eHours));
	endDate.setMinutes(parseInt(eMinutes) - 1);
	endDate.setSeconds(parseInt(eSeconds) - 1);

	let currentDate = new Date();

	// console.log(currentDate, startDate, endDate);
	return (endDate - startDate > 0 && currentDate - startDate > 0 && endDate - currentDate > 0);
};
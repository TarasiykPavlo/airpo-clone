export function getDateAicoinHistory(date) {
	const d = new Date(date);

	return d.getDate() + "d-" + (d.getMonth() + 1) + "m-" + d.getFullYear() + "y";
}

import { PhoneNumberUtil } from "google-libphonenumber";

export function formatDate(dateString) {
	const date = new Date(dateString);
	const year = date.getFullYear().toString().slice(-2);
	const month = (date.getMonth() + 1).toString().padStart(2, "0");
	const day = date.getDate().toString().padStart(2, "0");

	return `${month} / ${day} / ${year}`;
}

export function validatePhone(phone) {
	const phoneUtil = PhoneNumberUtil.getInstance();

	try {
		return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
	} catch (error) {
		return false;
	}
}

export function formatTimer(value) {
	let timerStr = value.toString().padStart(2, "0");

	return timerStr;
}

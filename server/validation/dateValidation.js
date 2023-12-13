function validateDate(year, month, day) {
	if (year && !/^\d{4}$/.test(year)) {
		return 'Invalid year format';
	}
	if (month && !/^\d{1,2}$/.test(month)) {
		return 'Invalid month format';
	}
	if (day && !/^\d{1,2}$/.test(day)) {
		return 'Invalid day format';
	}
	return null;
}

export { validateDate };

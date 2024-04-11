export const validateFormField = (fieldName: string, value: string) => {
	switch (fieldName) {
		case 'firstName':
			return value.trim() ? '' : 'First name must not be empty';
		case 'lastName':
			return value.trim() ? '' : 'Last name must not be empty';
		case 'email':
			const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			return value.trim() && regex.test(value) ? '' : 'Email is invalid.';
		case 'password':
			return value.trim() && value.length >= 6
				? ''
				: 'Password must be at least 6 characters long';
		default:
			return '';
	}
};

export const formatName = (str: string) => {
	return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

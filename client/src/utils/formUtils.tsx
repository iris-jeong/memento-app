import { FormData } from '@/types/forms';

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
	const formattedName = str.trim();
	return (
		formattedName.charAt(0).toUpperCase() + formattedName.slice(1).toLowerCase()
	);
};

export const normalizeFormData = (data: FormData): FormData => {
	const normalizedData: Partial<FormData> = {};

	// Normalize only the existing fields.
	Object.keys(data).forEach((key) => {
		const value = data[key as keyof FormData];

		switch (key) {
			case 'firstName':
			case 'lastName':
				normalizedData[key as keyof FormData] = value ? formatName(value) : '';
				break;
			case 'email':
				normalizedData[key as keyof FormData] = value
					? value.trim().toLowerCase()
					: '';
				break;
			case 'password':
				normalizedData[key as keyof FormData] = value;
				break;
			default:
				break;
		}
	});

	return normalizedData as FormData;
};

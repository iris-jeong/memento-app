import { FormData } from '@/types/forms';
import { RegisterResponse } from '@/types/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function registerUser(
	formData: FormData
): Promise<RegisterResponse> {
	const url = `${BASE_URL}/auth/register`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});

	if (!response.ok) {
		const errorResult = await response.json();
		throw new Error('Registration failed: ' + JSON.stringify(errorResult));
	}

	const result: RegisterResponse = await response.json();
	console.log('Registration successful', result);

	return result;
}

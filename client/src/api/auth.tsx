import { LoginFormData, RegisterFormData } from '@/types/forms';
import { Response } from '@/types/auth';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function registerUser(
	formData: RegisterFormData
): Promise<Response> {
	const url = `${BASE_URL}/auth/register`;
	console.log('BASE URL:', BASE_URL);

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

	const result: Response = await response.json();
	console.log('Registration successful', result);

	return result;
}

export async function loginUser(formData: LoginFormData): Promise<Response> {
	const url = `${BASE_URL}/auth/login`;
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(formData),
	});

	if (!response.ok) {
		const errorResult = await response.json();
		throw new Error('Login failed: ' + JSON.stringify(errorResult));
	}

	const result: Response = await response.json();
	console.log('Sign in successful', result);

	return result;
}

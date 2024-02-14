'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

type FormData = {
	email: string;
	password: string;
};

type FormErrors = {
	email?: string;
	password?: string;
};

export default function Login() {
	const [formData, setFormData] = useState<FormData>({
		email: '',
		password: '',
	});
	const [formErrors, setFormErrors] = useState<FormErrors>({});
	const [hasErrors, setHasErrors] = useState<boolean>(true);
	const [loginError, setLoginError] = useState<string>('');
	const auth = useAuth();
	const router = useRouter();

	useEffect(() => {
		const fieldsFilled = formData.email.trim() && formData.password.trim();
		const errorExists = Object.values(formErrors).some(
			(error) => error !== undefined && error !== ''
		);
		setHasErrors(!fieldsFilled || errorExists);
	}, [formData, formErrors]);

	const validateField = (name: string, value: string) => {
		const errors: FormErrors = { ...formErrors };

		switch (name) {
			case 'email':
				const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				const emailValid = regex.test(value);
				errors.email = value.trim() && emailValid ? '' : 'Email is invalid.';
				break;
			case 'password':
				errors.password =
					value.trim() && value.length > 0 ? '' : 'Password cannot be empty';
				break;
			default:
				break;
		}

		setFormErrors(errors);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
		validateField(name, value);
	};

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		try {
			const response = await fetch('http://localhost:3001/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			const result = await response.json();

			if (!response.ok) {
				const { message } = result;
				setLoginError(message);
				console.error('Sign in failed:', result);
				return;
			}
			console.log('Sign in successful', result);

			// Store the token & user
			const { token, user } = result;
			if (token) {
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(user));
				auth.login(token, user);
				router.push('/home');
			}
		} catch (error) {
			console.error('Error before or during fetch:', error);
		}
	};

	return (
		<div>
			<header className="flex justify-between items-center p-4 sm:px-12 sm:py-8">
				<a href="" className="mr-4 font-bold text-lg">
					Memento
					<span className="ml-2 text-base font-thin">
						- * Under Construction *
					</span>
				</a>
			</header>
			<main className="flex justify-center">
				<div className="bg-[#fafafa] w-full xs:w-3/5 rounded-xl mb-18">
					<div className="my-12 flex flex-col items-center">
						<h1 className="text-3xl font-bold">Sign In</h1>
						<p className="mt-4">Welcome back! Please sign in to continue.</p>
					</div>

					<form
						className="flex flex-col items-center mb-12"
						onSubmit={handleSubmit}
					>
						<div className="flex flex-col w-4/5 xs:w-3/4 mb-8">
							<label htmlFor="email" className="text-sm mb-1 tracking-wide">
								Email:
							</label>
							<input
								id="email"
								name="email"
								type="text"
								className="border-2 rounded h-14 px-2 text-lg"
								value={formData.email}
								onChange={handleChange}
							/>
							{formErrors.email && (
								<small className="text-red-600">{formErrors.email}</small>
							)}
						</div>

						<div className="flex flex-col w-4/5 xs:w-3/4 mb-8">
							<label htmlFor="password" className="text-sm mb-1 tracking-wide">
								Password:
							</label>
							<input
								id="password"
								name="password"
								type="password"
								className="border-2 rounded h-14 px-2 text-lg"
								value={formData.password}
								onChange={handleChange}
							/>
							{formErrors.password && (
								<small className="text-red-600">{formErrors.password}</small>
							)}
						</div>

						{loginError && <small className="text-red-600">{loginError}</small>}

						<button
							type="submit"
							className={`bg-[#1945e2] w-3/4 px-8 py-4 rounded text-white font-semibold text-xl mt-8 ${
								hasErrors ? 'opacity-50 cursor-none' : 'cursor-pointer'
							}`}
							disabled={hasErrors}
						>
							Sign In
						</button>
					</form>
				</div>
			</main>
		</div>
	);
}

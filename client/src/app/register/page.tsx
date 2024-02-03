'use client';
import { ChangeEvent, useState, FormEvent, useEffect } from 'react';

type FormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

type FormErrors = {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
};

export default function Register() {
	const [formData, setFormData] = useState<FormData>({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	});

	const [formErrors, setFormErrors] = useState<FormErrors>({});
	const [hasErrors, setHasErrors] = useState<boolean>(true);

	useEffect(() => {
		const fieldsFilled =
			formData.firstName.trim() &&
			formData.lastName.trim() &&
			formData.email.trim() &&
			formData.password.trim();
		const errorExists = Object.values(formErrors).some(
			(error) => error !== undefined && error !== ''
		);
		setHasErrors(!fieldsFilled || errorExists);
	}, [formData, formErrors]);

	const validateField = (name: string, value: string) => {
		const errors: FormErrors = { ...formErrors };

		switch (name) {
			case 'firstName':
				errors.firstName = value.trim() ? '' : 'First name must not be empty';
				break;
			case 'lastName':
				errors.lastName = value.trim() ? '' : 'Last name must not be empty';
				break;
			case 'email':
				const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
				const emailValid = regex.test(value);
				errors.email = value.trim() && emailValid ? '' : 'Email is invalid.';
				break;
			case 'password':
				errors.password =
					value.trim() && value.length >= 6
						? ''
						: 'Password must be at least 6 characters long';
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
			const response = await fetch('http://localhost:3001/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});

			if (!response.ok) {
				const errorData = await response.json();
				console.error('Registration failed:', errorData);
			}

			const result = await response.json();
			console.log(result);
		} catch (error) {
			console.error('Error:', error);
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
					<div className="my-12">
						<h1 className="text-3xl text-center font-bold">Sign Up</h1>
						<p className="text-center mt-4">
							Create an account to get started.
						</p>
					</div>

					<form
						className="flex flex-col items-center mb-12"
						onSubmit={handleSubmit}
					>
						<div className="flex flex-col w-4/5 xs:w-3/4 mb-8">
							<label htmlFor="firstName" className="text-sm mb-1 tracking-wide">
								First Name:
							</label>
							<input
								id="firstName"
								name="firstName"
								type="text"
								className="border-2 rounded h-14 px-2 text-lg"
								value={formData.firstName}
								onChange={handleChange}
							/>
							{formErrors.firstName && (
								<small className="text-red-600">{formErrors.firstName}</small>
							)}
						</div>

						<div className="flex flex-col w-4/5 xs:w-3/4 mb-8">
							<label htmlFor="lastName" className="text-sm mb-1 tracking-wide">
								Last Name:
							</label>
							<input
								id="lastName"
								name="lastName"
								type="text"
								className="border-2 rounded h-14 px-2 text-lg"
								value={formData.lastName}
								onChange={handleChange}
							/>
							{formErrors.lastName && (
								<small className="text-red-600">{formErrors.lastName}</small>
							)}
						</div>

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

						<button
							type="submit"
							className={`bg-[#1945e2] w-3/4 px-8 py-4 rounded text-white font-semibold text-xl mt-8 ${
								hasErrors ? 'opacity-50 cursor-none' : 'cursor-pointer'
							}`}
							disabled={hasErrors}
						>
							Sign Up
						</button>
					</form>
				</div>
			</main>
		</div>
	);
}

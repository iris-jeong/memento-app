'use client';
import { loginUser } from '@/api/auth';
import Button from '@/components/atoms/Button';
import TextInput from '@/components/atoms/TextInput';
import Header from '@/components/organisms/Header';
import { useAuth } from '@/hooks/useAuth';
import useForm from '@/hooks/useForm';
import { LoginFormData } from '@/types/forms';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Login() {
	const initialValues: LoginFormData = {
		email: '',
		password: '',
	};
	const formFields: Array<{
		id: keyof LoginFormData;
		label: string;
		type: string;
	}> = [
		{ id: 'email', label: 'Email', type: 'text' },
		{ id: 'password', label: 'Password', type: 'password' },
	];
	const [loginError, setLoginError] = useState<string>('');
	const auth = useAuth();
	const router = useRouter();

	const onSubmit = async (formData: LoginFormData) => {
		try {
			const { token, user } = await loginUser(formData);

			// Store the token & user
			if (token && user) {
				localStorage.setItem('token', token);
				localStorage.setItem('user', JSON.stringify(user));
				auth.login(token, user);
				router.push('/home');
			}
		} catch (error) {
			setLoginError('Invalid email or password');
			console.error('Error before or during fetch:', error);
		}
	};

	const { formData, handleChange, handleSubmit, hasErrors, formErrors } =
		useForm({
			initialValues,
			onSubmit,
			onFieldChange: () => setLoginError(''),
		});

	return (
		<>
			<Header />

			<main className="h-screen flex justify-center xs:pt-16">
				<div className="bg-[#fafafa] w-full h-screen xs:h-fit xs:w-3/5 xs:min-w-[500px] max-w-[600px] rounded-xl flex justify-center">
					<div className="flex flex-col w-4/5 py-4 xs:py-16">
						<div className="mb-8">
							<h1 className="text-3xl text-center font-bold">Sign In</h1>
							<p className="text-center mt-4">
								Welcome back! Please sign in to continue.
							</p>
						</div>

						<form
							className="flex flex-col items-center"
							onSubmit={handleSubmit}
						>
							{formFields.map((field) => (
								<TextInput
									key={field.id}
									id={field.id}
									type={field.type}
									label={field.label}
									value={formData[field.id]}
									error={''}
									onChange={handleChange}
								/>
							))}

							{loginError && (
								<small className="text-red-600">{loginError}</small>
							)}

							<Button
								type="submit"
								variant="secondary"
								className={
									hasErrors
										? 'opacity-50 cursor-default hover:bg-[#1945E2]'
										: 'cursor-pointer'
								}
								disabled={hasErrors}
							>
								Log In
							</Button>
						</form>
					</div>
				</div>
			</main>
		</>
	);
}

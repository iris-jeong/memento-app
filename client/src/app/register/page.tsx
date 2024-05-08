'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { RegisterFormData } from '@/types/forms';
import useForm from '@/hooks/useForm';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { registerUser } from '@/api/auth';
import Header from '@/components/organisms/Header';
import TextInput from '@/components/atoms/TextInput';
import Button from '@/components/atoms/Button';

export default function Register() {
	const initialValues: RegisterFormData = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	};
	const formFields: Array<{
		id: keyof RegisterFormData;
		label: string;
		type: string;
	}> = [
		{ id: 'firstName', label: 'First Name', type: 'text' },
		{ id: 'lastName', label: 'Last Name', type: 'text' },
		{ id: 'email', label: 'Email', type: 'text' },
		{ id: 'password', label: 'Password', type: 'password' },
	];
	const auth = useAuth();
	const router = useRouter();
	const { isLoading, isRedirecting } = useAuthRedirect('/home');

	const onSubmit = async (formData: RegisterFormData) => {
		try {
			const { token, user } = await registerUser(formData);

			// Store the token & user
			if (token && user) {
				localStorage.setItem('token', token);
				auth.login(token, user);
				router.push('/home');
			}
		} catch (error) {
			console.error('Error:', error);
		}
	};

	const { formData, handleChange, handleSubmit, hasErrors, formErrors } =
		useForm({
			initialValues,
			onSubmit,
		});

	if (isLoading || isRedirecting) {
		return (
			<div className="flex justify-center items-center h-screen">
				<BeatLoader
					loading={true}
					color="#1945E2"
					aria-label="Loading Spinner"
				/>
			</div>
		);
	}

	return (
		<>
			<Header />

			<main className="flex justify-center">
				<div className="bg-[#fafafa] w-full xs:w-3/5 xs:min-w-[500px] max-w-[600px] rounded-xl flex justify-center">
					<div className="flex flex-col w-4/5 py-16">
						<div className="mb-8">
							<h1 className="text-3xl text-center font-bold">Sign Up</h1>
							<p className="text-center mt-4">
								Create an account to get started.
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
									error={formErrors[field.id] || ''}
									onChange={handleChange}
								/>
							))}

							<Button type="submit" variant="secondary" disabled={hasErrors}>
								Sign Up
							</Button>
						</form>
					</div>
				</div>
			</main>
		</>
	);
}

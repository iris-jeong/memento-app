'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { FormData } from '@/types/forms';
import useForm from '@/hooks/useForm';
import { registerUser } from '@/api/auth';
import Header from '@/components/organisms/Header';
import TextInput from '@/components/atoms/TextInput';

export default function Register() {
	const initialValues: FormData = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	};
	const formFields = [
		{ id: 'firstName', label: 'First Name' },
		{ id: 'lastName', label: 'Last Name' },
		{ id: 'email', label: 'Email' },
		{ id: 'password', label: 'Password' },
	];
	const auth = useAuth();
	const router = useRouter();

	const onSubmit = async (formData: FormData) => {
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

	return (
		<div>
			<Header />
			<main className="flex justify-center">
				<div className="bg-[#fafafa] w-full xs:w-3/5 xs:min-w-[500px] max-w-[600px] rounded-xl mb-18">
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
						{formFields.map((field) => (
							<TextInput
								key={field.id}
								id={field.id}
								label={field.label}
								value={formData[field.id as keyof FormData]}
								error={
									formErrors[field.id as keyof FormData]
										? formErrors[field.id as keyof FormData]
										: ''
								}
								onChange={handleChange}
							/>
						))}
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

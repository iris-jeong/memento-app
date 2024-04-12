'use client';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { FormData } from '@/types/forms';
import useForm from '@/hooks/useForm';
import { registerUser } from '@/api/auth';
import Header from '@/components/organisms/Header';

export default function Register() {
	const initialValues: FormData = {
		firstName: '',
		lastName: '',
		email: '',
		password: '',
	};
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

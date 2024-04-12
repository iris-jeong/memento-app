import { ChangeEvent, FormEvent, ReactNode } from 'react';

export type FormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export type FormErrors = {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
};

export interface UseFormProps {
	initialValues: FormData;
	onSubmit: (formData: FormData) => void;
}

export interface TextInputProps {
	id: string;
	label: string;
	value: string;
	error?: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

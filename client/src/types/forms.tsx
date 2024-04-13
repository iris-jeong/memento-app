import { ChangeEvent } from 'react';

export type RegisterFormData = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
};

export type LoginFormData = {
	email: string;
	password: string;
};

export type FormErrors = {
	firstName?: string;
	lastName?: string;
	email?: string;
	password?: string;
};

export interface UseFormProps<T> {
	initialValues: T;
	onSubmit: (formData: T) => void;
	onFieldChange?: (fieldName: keyof T) => void;
}

export interface TextInputProps {
	id: string;
	type: string;
	label: string;
	value: string;
	error?: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

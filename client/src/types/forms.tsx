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

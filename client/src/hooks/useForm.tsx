import { useState, useCallback, useMemo } from 'react';
import { FormData, FormErrors, UseFormProps } from '@/types/forms';
import { formatName, validateFormField } from '@/utils/formUtils';

const useForm = ({ initialValues, onSubmit }: UseFormProps) => {
	const [formData, setFormData] = useState<FormData>(initialValues);
	const [formErrors, setFormErrors] = useState<Partial<FormErrors>>({});

	// Calculate whether the form has errors if the form's data or errors change.
	const hasErrors = useMemo(() => {
		return (
			!Object.values(formData).every((value) => value.trim()) ||
			Object.values(formErrors).some((error) => error)
		);
	}, [formData, formErrors]);

	const handleValidation = useCallback((fieldName: string, value: string) => {
		const error = validateFormField(fieldName, value);
		setFormErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
	}, []);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			let formattedValue = value;
			if (name === 'firstName' || name === 'lastName') {
				formattedValue = formatName(value);
			}
			// Update the form data and form errors.
			setFormData((prevData) => ({ ...prevData, [name]: formattedValue }));
			handleValidation(name, formattedValue);
		},
		[handleValidation]
	);

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const normalizedFormData = {
				...formData,
				email: formData.email.trim().toLowerCase(),
			};

			onSubmit(normalizedFormData);
		},
		[formData, onSubmit]
	);

	return { formData, handleChange, handleSubmit, hasErrors, formErrors };
};

export default useForm;

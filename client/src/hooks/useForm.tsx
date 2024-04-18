import { useState, useCallback, useMemo } from 'react';
import { FormErrors, UseFormProps } from '@/types/forms';
import { normalizeFormData, validateFormField } from '@/utils/formUtils';

function useForm<T extends Record<string, any>>({
	initialValues,
	onSubmit,
	onFieldChange,
}: UseFormProps<T>) {
	const [formData, setFormData] = useState<T>(initialValues);
	const [formErrors, setFormErrors] = useState<Partial<FormErrors>>({});

	// Calculate whether the form has errors if the form's data or errors change.
	const hasErrors = useMemo(() => {
		return (
			!Object.values(formData).every((value) =>
				typeof value === 'string' ? value.trim() !== '' : true
			) || Object.values(formErrors).some((error) => error)
		);
	}, [formData, formErrors]);

	const handleValidation = useCallback((fieldName: string, value: string) => {
		const error = validateFormField(fieldName, value);
		setFormErrors((prevErrors) => ({ ...prevErrors, [fieldName]: error }));
	}, []);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
			const { name, value } = e.target;

			if (onFieldChange) {
				onFieldChange(name as keyof T);
			}
			// Update the form data and form errors.
			setFormData((prevData) => ({ ...prevData, [name]: value }));
			handleValidation(name, value);
		},
		[handleValidation, onFieldChange]
	);

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			const normalizedFormData = normalizeFormData(formData);
			onSubmit(normalizedFormData);
		},
		[formData, onSubmit]
	);

	const resetForm = () => {
		setFormData(initialValues);
	};

	return {
		formData,
		handleChange,
		handleSubmit,
		hasErrors,
		formErrors,
		resetForm,
	};
}

export default useForm;

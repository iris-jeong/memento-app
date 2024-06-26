import { TagType } from '@/types/tags';
import { EntryType } from '@/types/entries';
import { ChangeEvent } from 'react';

export interface EntryFormProps {
	setEntries: React.Dispatch<React.SetStateAction<EntryType[]>>;
	highlightEntry: (entryId: string) => void;
}

export type EntryFormData = {
	userId?: string;
	date: Date;
	content: string;
	tags: TagType[];
};

export type EntryContentData = {
	content: string;
};

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

export interface TextAreaInputProps {
	value: string;
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

import { CreateEntryResponse, EntryType } from '@/types/entries';
import { EntryFormData } from '@/types/forms';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getEntries(token: string): Promise<EntryType[]> {
	const url = `${BASE_URL}/entries`;

	const response = await fetch(url, {
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error('Failed to retrieve entries');
	}

	return result;
}

export async function createEntry(
	formData: EntryFormData,
	token: string
): Promise<CreateEntryResponse> {
	const url = `${BASE_URL}/entries/new`;

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({
			date: formData.date,
			content: formData.content,
			userId: formData.userId,
			tags: formData.tags,
		}),
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error('Failed to create a new entry.');
	}

	return result;
}

export async function updateEntry(
	entryId: string,
	formData: EntryFormData,
	token: string
) {
	const url = `${BASE_URL}/entries/${entryId}`;

	const response = await fetch(url, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(formData),
	});

	const result = await response.json();

	if (!response.ok) {
		throw new Error('Failed to update entry.');
	}

	return result;
}

export async function deleteEntry(token: string, entryId: string) {
	const url = `${BASE_URL}/entries/${entryId}`;

	const response = await fetch(url, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});

	if (!response.ok) {
		throw new Error('Failed to delete entry.');
	}
}

import { CreateEntryResponse } from '@/types/entries';
import { EntryFormData } from '@/types/forms';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
			tagIds: formData.tags.map((tag) => tag._id),
		}),
	});

	const result = await response.json();

	if (!response.ok) {
		console.error('Entry submission failed:', result);
		throw new Error('Failed to create a new entry.');
	}

	console.log('Entry submission successful', result);

	return result;
}

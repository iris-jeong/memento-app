import { TagType } from '@/components/Tag';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getTags(token: string): Promise<TagType[]> {
	const url = `${BASE_URL}/tags`;

	const response = await fetch(url, {
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`,
		},
	});
	if (!response.ok) {
		throw new Error('Failed to fetch tags');
	}
	const result = await response.json();

	return result;
}

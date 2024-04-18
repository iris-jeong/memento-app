import { getTags } from '@/api/tags';
import { TagType } from '@/types/tags';
import { useEffect, useState } from 'react';

export const useTags = (): [TagType[], boolean] => {
	const [tags, setTags] = useState<TagType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchAndCacheTags = async () => {
			const token = localStorage.getItem('token');
			if (!token) {
				console.error('Authentication required');
				setLoading(false);
				return;
			}

			try {
				const cachedTags = sessionStorage.getItem('tags');
				if (cachedTags) {
					setTags(JSON.parse(cachedTags));
				} else {
					const fetchedTags = await getTags(token);
					sessionStorage.setItem('tags', JSON.stringify(fetchedTags));
					setTags(fetchedTags);
				}
			} catch (error) {
				console.error('Failed to fetch tags', error);
			} finally {
				setLoading(false);
			}
		};

		fetchAndCacheTags();
	}, []);

	return [tags, loading];
};

import { getTags } from '@/api/tags';
import { TagType } from '@/types/tags';
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

export const useTags = (): [TagType[], boolean] => {
	const { isAuthenticated, token } = useAuth();
	const [tags, setTags] = useState<TagType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchAndCacheTags = async () => {
			if (!isAuthenticated) {
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

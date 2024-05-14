'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BeatLoader } from 'react-spinners';
import { EntryType } from '@/types/entries';
import { useAuth } from '@/hooks/useAuth';
import { getEntries } from '@/api/entries';
import Header from '@/components/organisms/Header';
import EntryForm from '@/components/organisms/EntryForm';
import AllEntries from '@/components/organisms/AllEntries';
import Toast from '@/components/atoms/Toast';

export default function Home() {
	const { isAuthenticated, token } = useAuth();
	const router = useRouter();

	const [entries, setEntries] = useState<EntryType[]>([]);
	const [highlightedEntryId, setHighlightedEntryId] = useState<string | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);

	const highlightEntry = (entryId: string) => {
		setHighlightedEntryId(entryId);
		setTimeout(() => {
			setHighlightedEntryId(null);
		}, 4000);
	};

	useEffect(() => {
		if (!isAuthenticated) {
			console.error('Authentication required');
			router.replace('/login');
			return;
		}

		const fetchEntries = async () => {
			setIsLoading(true);
			try {
				const data = await getEntries(token);
				setEntries(data);
			} catch (error) {
				console.error('Error fetching data: ', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchEntries();
	}, [router, isAuthenticated]);

	if (isLoading) return <BeatLoader />;

	return (
		<div className="relative">
			<Header />
			<main>
				<EntryForm setEntries={setEntries} highlightEntry={highlightEntry} />
				<AllEntries
					entries={entries}
					setEntries={setEntries}
					highlightedEntryId={highlightedEntryId}
				/>
			</main>
			<Toast />
		</div>
	);
}

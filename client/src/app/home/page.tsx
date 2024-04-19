'use client';
import { getEntries } from '@/api/entries';
import '../globals.css';
import DailyEntries from '@/components/DailyEntries';
import EntryForm from '@/components/EntryForm';
import Header from '@/components/organisms/Header';
import { EntryType } from '@/types/entries';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
	const [entries, setEntries] = useState<EntryType[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			console.error('Authentication required');
			router.push('/login');
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
	}, [router]);

	if (isLoading) return <div>Loading...</div>;

	return (
		<>
			<Header />
			<main>
				<EntryForm setEntries={setEntries} />
				<DailyEntries entries={entries} />
			</main>
		</>
	);
}

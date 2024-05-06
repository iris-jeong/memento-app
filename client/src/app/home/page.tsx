'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getEntries } from '@/api/entries';
import { EntryType } from '@/types/entries';
import Header from '@/components/organisms/Header';
import EntryForm from '@/components/organisms/EntryForm';
import AllEntries from '@/components/organisms/AllEntries';
import Toast from '@/components/atoms/Toast';

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
		<div className="relative">
			<Header />
			<main>
				<EntryForm setEntries={setEntries} />
				<AllEntries entries={entries} setEntries={setEntries} />
			</main>
			<Toast />
		</div>
	);
}

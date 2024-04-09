'use client';
import DailyEntries from '@/components/DailyEntries';
import EntryForm from '@/components/EntryForm';
import Header from '@/components/organisms/Header';
import '../globals.css';
import { useEffect, useState } from 'react';

export default function Home() {
	const [entries, setEntries] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchEntries = async () => {
			setIsLoading(true);

			try {
				const response = await fetch('http://localhost:3001/api/entries', {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});

				if (!response.ok) {
					console.error(`HTTP error! status: ${response.status}`);
				}
				const data = await response.json();
				setEntries(data);
				console.log('data: ', data);
			} catch (error) {
				console.error('Error fetching data: ', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchEntries();
	}, []);

	if (isLoading) return <div>Loading...</div>;

	return (
		<div className="font-sourceserif">
			<Header />
			<main className="">
				<EntryForm />
				<DailyEntries entries={entries} />
			</main>
		</div>
	);
}

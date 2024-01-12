import DailyEntries from '@/components/DailyEntries';
import EntryForm from '@/components/EntryForm';
import Header from '@/components/Header';
import '../globals.css';

export default function Home() {
	return (
		<div className="font-sourceserif">
			<Header />
			<main className="">
				<EntryForm />
				<DailyEntries />
			</main>
		</div>
	);
}

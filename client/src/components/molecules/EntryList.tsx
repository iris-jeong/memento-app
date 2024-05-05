import { EntryListProps } from '@/types/entries';
import Entry from '@/components/atoms/Entry';

export default function EntryList({
	entries,
	filteredEntries,
	onClick,
}: EntryListProps) {
	const noEntries = entries.length === 0;
	const noMatchingEntries = !noEntries && filteredEntries.length === 0;

	return (
		<div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-2 xs:px-4">
			{filteredEntries.length !== 0 ? (
				filteredEntries.map((entry) => (
					<Entry
						key={entry._id}
						date={entry.date}
						content={entry.content}
						tags={entry.tags}
						handleEntryClick={() => onClick(entry)}
					/>
				))
			) : noEntries ? (
				<div className="col-span-full h-[400px] flex flex-col justify-center items-center">
					<h2 className="text-xl font-bold">No entries added yet</h2>
					<p className="w-[370px] text-center">
						You have not added any entries yet. Add an entry in the form above
						to view it here.
					</p>
				</div>
			) : noMatchingEntries ? (
				<div className="col-span-full h-[400px] flex flex-col justify-center items-center">
					<h2 className="text-xl font-bold">No matching entries</h2>
					<p className="w-[370px] text-center">
						There are no entries matching your selected filters. Adjust your
						filters or add new entries that match.
					</p>
				</div>
			) : null}
		</div>
	);
}

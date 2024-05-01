'use client';
import { useMemo, useRef, useState } from 'react';
import { AllEntriesProps, EntryType } from '@/types/entries';
import { TagType } from '@/types/tags';
import { useModal } from '@/hooks/useModal';
import useClickOutside from '@/hooks/useClickOutside';
import Entry from '@/components/atoms/Entry';
import Modal from '@/components/molecules/Modal';
import TagFilter from '@/components/molecules/TagFilter';
import DateFilter from '@/components/molecules/DateFilter';

export default function AllEntries({ entries, setEntries }: AllEntriesProps) {
	const { isOpen, currentEntry, openModal, closeModal } = useModal();
	const modalRef = useRef<HTMLDivElement>(null);
	const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
	const [selectedYear, setSelectedYear] = useState<number>(
		new Date().getFullYear()
	);
	const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

	useClickOutside(modalRef, closeModal);

	const handleEntryClick = (entry: EntryType): void => {
		openModal(entry);
	};

	const filteredEntries = useMemo(() => {
		return entries.filter((entry) => {
			const entryDate = new Date(entry.date);
			const entryYear = entryDate.getFullYear();
			const entryMonth = entryDate.getMonth();

			const matchesDate =
				selectedYear === null ||
				selectedMonth === null ||
				(entryYear === selectedYear && entryMonth === selectedMonth);

			const matchesTags =
				selectedTags.length === 0 ||
				entry.tags.some((tag) =>
					selectedTags.some((selectedTag) => selectedTag._id === tag._id)
				);

			return matchesDate && matchesTags;
		});
	}, [entries, selectedTags, selectedYear, selectedMonth]);

	const noEntries = entries.length === 0;
	const noMatchingEntries = !noEntries && filteredEntries.length === 0;

	return (
		<section className="w-full xs:h-screen bg-[#F2F2F2] border-2 pb-8 mx-0 xl:px-12">
			{isOpen && (
				<Modal
					ref={modalRef}
					entry={currentEntry}
					closeModal={closeModal}
					setEntries={setEntries}
				/>
			)}

			<div className="max-w-[1200px] mx-auto">
				<div className="p-1 xs:px-4">
					<div className="flex items-center justify-between p-2 xs:p-0 xs:my-4 mx-auto">
						<h1 className="font-bold">My Entries</h1>
						<div className="flex">
							<TagFilter
								selectedTags={selectedTags}
								setSelectedTags={setSelectedTags}
							/>

							<DateFilter
								selectedYear={selectedYear}
								setSelectedYear={setSelectedYear}
								selectedMonth={selectedMonth}
								setSelectedMonth={setSelectedMonth}
							/>
						</div>
					</div>
				</div>

				<div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 px-2 xs:px-4">
					{filteredEntries.length !== 0 ? (
						filteredEntries.map((entry) => (
							<Entry
								key={entry._id}
								date={entry.date}
								content={entry.content}
								tags={entry.tags}
								handleEntryClick={() => handleEntryClick(entry)}
							/>
						))
					) : noEntries ? (
						<div className="col-span-full h-[400px] flex flex-col justify-center items-center">
							<h2 className="text-xl font-bold">No entries added yet</h2>
							<p className="w-[370px] text-center">
								You have not added any entries yet. Add an entry in the form
								above to view it here.
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
			</div>
		</section>
	);
}

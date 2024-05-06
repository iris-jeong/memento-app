'use client';
import { useMemo, useRef, useState } from 'react';
import { AllEntriesProps, EntryType } from '@/types/entries';
import { TagType } from '@/types/tags';
import { useModal } from '@/hooks/useModal';
import useClickOutside from '@/hooks/useClickOutside';
import Modal from '@/components/molecules/Modal';
import TagFilter from '@/components/molecules/TagFilter';
import DateFilter from '@/components/molecules/DateFilter';
import EntryList from '@/components/molecules/EntryList';

export default function AllEntries({ entries, setEntries }: AllEntriesProps) {
	const { isOpen, currentEntry, openModal, closeModal } = useModal();
	const modalRef = useRef<HTMLDivElement>(null);
	const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
	const [selectedYear, setSelectedYear] = useState<number>(
		new Date().getFullYear()
	);
	const [selectedMonth, setSelectedMonth] = useState<number | null>(null);

	useClickOutside(modalRef, closeModal);

	const handleResetClick = () => {
		setSelectedMonth(null);
		setSelectedTags([]);
	};

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

	const hasFilters = selectedMonth || selectedTags.length !== 0;

	return (
		<section className="w-full h-fit bg-[#F2F2F2] border-2 pb-8 mx-0 xl:px-12">
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
							<button
								type="button"
								aria-label="Reset all filter selections"
								className={`mr-4 underline ${
									hasFilters ? 'text-[#454545]' : 'text-[#D5D5D5]'
								}`}
								onClick={handleResetClick}
								disabled={!hasFilters}
							>
								Reset All
							</button>

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

				<EntryList
					entries={entries}
					filteredEntries={filteredEntries}
					onClick={handleEntryClick}
				/>
			</div>
		</section>
	);
}

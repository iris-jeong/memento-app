'use client';
import { useMemo, useRef, useState } from 'react';
import Filters from '@/components/Filters';
import Modal from '@/components/molecules/Modal';
import Entry from '@/components/Entry';
import { AllEntriesProps, EntryType } from '@/types/entries';
import { TagType } from '@/types/tags';
import { MonthType } from '@/components/monthMenu';
import TagFilter from '@/components/molecules/TagFilter';
import useFilter from '@/hooks/useFilter';
import useMultipleClickOutside from '@/hooks/useMultipleClickOutside';
import useClickOutside from '@/hooks/useClickOutside';
import { useModal } from '@/hooks/useModal';
import DateFilter from '../molecules/DateFilter';

export default function AllEntries({ entries, setEntries }: AllEntriesProps) {
	const { isOpen, currentEntry, openModal, closeModal } = useModal();
	const modalRef = useRef<HTMLDivElement>(null);
	const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
	const [selectedYear, setSelectedYear] = useState<number>(
		new Date().getFullYear()
	);
	const [selectedMonth, setSelectedMonth] = useState<number>(
		new Date().getMonth()
	);

	useClickOutside(modalRef, closeModal);

	const handleEntryClick = (entry: EntryType): void => {
		openModal(entry);
	};

	return (
		<section className="bg-[#F2F2F2] border-solid border-2 w-full mx-0 xl:px-12">
			{isOpen && (
				<Modal
					ref={modalRef}
					entry={currentEntry}
					closeModal={closeModal}
					setEntries={setEntries}
				/>
			)}

			<div className="max-w-[1200px] mx-auto">
				<div className=" rounded-md p-1 xs:px-4">
					<div className="flex flex-col xs:flex-row xs:items-center xs:justify-between p-2 xs:p-0 xs:my-4 mx-auto">
						<h1 className="font-bold mb-2 xs:mb-0">My Entries</h1>
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

				<div className="entries w-full">
					<div className="w-full md:flex md:flex-wrap md:justify-between">
						{entries.length !== 0 ? (
							entries.map((entry) => (
								<Entry
									key={entry._id}
									date={entry.date}
									content={entry.content}
									tags={entry.tags}
									handleEntryClick={() => handleEntryClick(entry)}
								/>
							))
						) : (
							<div className="h-[400px] w-full flex flex-col justify-center items-center">
								<h2 className="text-xl font-bold">No entries added yet</h2>
								<p className="w-[370px] text-center">
									You have not added any entries yet. Add an entry in the form
									above to view it here.
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

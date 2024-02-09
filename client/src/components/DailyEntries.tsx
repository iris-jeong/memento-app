'use client';
import { useRef, useState } from 'react';
import Filters from './Filters';
import Entry from './Entry';
import useFilter from '@/hooks/useFilter';
import useMultipleClickOutside from '@/hooks/useMultipleClickOutside';
import { TagType } from './TagMenu';
import { MonthType } from './monthMenu';
import Modal from './Modal';
import useClickOutside from '@/hooks/useClickOutside';

type EntryType = {
	date: Date;
	text: string;
	tags: TagType[];
};

interface DailyEntriesProps {
	entries: EntryType[];
}

export default function DailyEntries({ entries }: DailyEntriesProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const tagListRef = useRef<HTMLDivElement>(null);
	const monthListRef = useRef<HTMLDivElement>(null);
	const dayListRef = useRef<HTMLDivElement>(null);
	const yearListRef = useRef<HTMLDivElement>(null);
	const modalRef = useRef<HTMLDivElement>(null);

	const tagsFilter = useFilter<TagType>([]);
	const monthsFilter = useFilter<MonthType>([]);
	const daysFilter = useFilter<number>([]);
	const yearsFilter = useFilter<number>([]);

	const clickOutsideConfigs = [
		{ ref: tagListRef, handler: () => tagsFilter.closeFilter() },
		{ ref: monthListRef, handler: () => monthsFilter.closeFilter() },
		{ ref: dayListRef, handler: () => daysFilter.closeFilter() },
		{ ref: yearListRef, handler: () => yearsFilter.closeFilter() },
	];

	useMultipleClickOutside(clickOutsideConfigs);
	useClickOutside(modalRef, () => setIsModalOpen(false));

	const handleEntryClick = (id: number): void => {
		setIsModalOpen(true);
	};

	// const entries: EntryType[] = [
	// 	{
	// 		date: new Date(),
	// 		text: 'my first entry',
	// 		tags: ['Conversation', 'Realization', 'Observation'],
	// 	},
	// 	{
	// 		date: new Date(),
	// 		text: "Today, during my usual morning walk, I noticed the first daffodil of the season blooming in my neighbor's garden. It was a vivid yellow, standing out against the dull winter landscape.",
	// 		tags: ['Conversation', 'Realization', 'Observation'],
	// 	},
	// 	{
	// 		date: new Date(),
	// 		text: "Today, during my usual morning walk, I noticed the first daffodil of the season blooming in my neighbor's garden. It was a vivid yellow, standing out against the dull winter landscape.Today, during my usual morning walk, I noticed the first daffodil of the season blooming in my neighbor's garden. It was a vivid yellow, standing out against the dull winter landscape.",
	// 		tags: ['Conversation', 'Realization', 'Observation'],
	// 	},
	// 	{
	// 		date: new Date(),
	// 		text: "Today, during my usual morning walk, I noticed the first daffodil of the season blooming in my neighbor's garden. It was a vivid yellow, standing out against the dull winter landscape.Today, during my usual morning walk, I noticed the first daffodil of the season blooming in my neighbor's garden. It was a vivid yellow, standing out against the dull winter landscape. Today, during my usual morning walk, I noticed the first daffodil of the season blooming in my neighbor's garden. It was a vivid yellow, standing out against the dull winter landscape.Today, during my usual morning walk, I noticed the first daffodil of the season blooming in my neighbor's garden. It was a vivid yellow, standing out against the dull winter landscape.",
	// 		tags: ['Conversation', 'Realization', 'Observation'],
	// 	},
	// ];

	return (
		<section className="relative bg-[#F2F2F2] border-solid border-2 w-full mx-0 xl:px-12">
			{isModalOpen && (
				<div className="absolute inset-0 bg-black bg-opacity-30 w-full flex justify-center items-center z-10">
					<Modal ref={modalRef} setIsModalOpen={setIsModalOpen} />
				</div>
			)}

			<div className="max-w-[1200px] mx-auto">
				<div className=" rounded-md p-1 xs:px-4">
					<div className="flex flex-col xs:flex-row xs:items-center xs:justify-between p-2 xs:p-0 xs:my-4 mx-auto">
						<h1 className="font-bold mb-2 xs:mb-0">My Entries</h1>

						<Filters
							tagsFilter={tagsFilter}
							monthsFilter={monthsFilter}
							daysFilter={daysFilter}
							yearsFilter={yearsFilter}
							tagListRef={tagListRef}
							monthListRef={monthListRef}
							dayListRef={dayListRef}
							yearListRef={yearListRef}
						/>
					</div>
				</div>

				<div className="entries w-full">
					<div className="w-full md:flex md:flex-wrap md:justify-between">
						{entries.length !== 0 ? (
							entries.map((entry, index) => (
								<Entry
									key={index}
									date={entry.date}
									text={entry.text}
									tags={entry.tags}
									handleEntryClick={() => handleEntryClick(index)}
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

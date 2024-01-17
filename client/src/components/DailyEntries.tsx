'use client';
import { useState, useRef } from 'react';
import Filters from './Filters';
import Entry from './Entry';
import useFilter from '@/hooks/useFilter';
import useMultipleClickOutside from '@/hooks/useMultipleClickOutside';
import { TagType } from './TagMenu';
import { MonthType } from './monthMenu';

type EntryType = {
	date: Date;
	text: string;
	tags: TagType[];
};

export default function DailyEntries() {
	const tagListRef = useRef<HTMLDivElement>(null);
	const monthListRef = useRef<HTMLDivElement>(null);
	const dayListRef = useRef<HTMLDivElement>(null);
	const yearListRef = useRef<HTMLDivElement>(null);

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
	const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
	const [selectedMonths, setSelectedMonths] = useState<MonthType[]>([]);
	const [selectedDays, setSelectedDays] = useState<number[]>([]);
	const [selectedYears, setSelectedYears] = useState<number[]>([]);

	useMultipleClickOutside(clickOutsideConfigs);

	const removeTag = (tag: TagType): void => {
		setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
	};
	const removeMonth = (month: MonthType): void => {
		setSelectedMonths((prevMonths) => prevMonths.filter((m) => m !== month));
	};
	const removeDay = (day: number): void => {
		setSelectedDays((prevDays) => prevDays.filter((d) => d !== day));
	};
	const removeYear = (year: number): void => {
		setSelectedYears((prevYears) => prevYears.filter((y) => y !== year));
	};

	const entries: EntryType[] = [
		{
			date: new Date(),
			text: 'my first entry',
			tags: ['Conversation', 'Realization', 'Observation'],
		},
	];

	return (
		<section className="daily-entries bg-[#F2F2F2] border-solid border-2 w-full mx-0">
			<div className="rounded-md xs:p-8">
				<div className="flex flex-wrap xs:justify-between p-2">
					<h1 className="font-bold">My Entries</h1>

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

			<div className="entries">
				{entries.map((entry, index) => (
					<Entry
						key={index}
						date={entry.date}
						text={entry.text}
						tags={entry.tags}
					/>
				))}
			</div>
		</section>
	);
}

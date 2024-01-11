'use client';
import DownArrow from '../../public/down.svg';
import Image from 'next/image';
import { useState, useRef } from 'react';
import TagMenu from './TagMenu';
import MonthMenu from './monthMenu';
import useClickOutside from '@/hooks/useClickOutside';
import DayMenu from './DayMenu';
import YearMenu from './YearMenu';

type TagType =
	| 'Event'
	| 'Conversation'
	| 'Feeling'
	| 'Realization'
	| 'Observation';

type MonthType =
	| 'January'
	| 'February'
	| 'March'
	| 'April'
	| 'May'
	| 'June'
	| 'July'
	| 'August'
	| 'September'
	| 'October'
	| 'November'
	| 'December';
export default function DailyEntries() {
	const [isTagsOpen, setIsTagsOpen] = useState<boolean>(false);
	const [isMonthsOpen, setIsMonthsOpen] = useState<boolean>(false);
	const [isDaysOpen, setIsDaysOpen] = useState<boolean>(false);
	const [isYearsOpen, setIsYearsOpen] = useState<boolean>(false);
	const tagListRef = useRef<HTMLDivElement>(null);
	const monthListRef = useRef<HTMLDivElement>(null);
	const dayListRef = useRef<HTMLDivElement>(null);
	const yearListRef = useRef<HTMLDivElement>(null);
	const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
	const [selectedMonths, setSelectedMonths] = useState<MonthType[]>([]);
	const [selectedDays, setSelectedDays] = useState<number[]>([]);
	const [selectedYears, setSelectedYears] = useState<number[]>([]);

	const tags = [
		'Event',
		'Conversation',
		'Feeling',
		'Realization',
		'Observation',
	];
	const months = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec',
	];
	const years = ['2022', '2023', '2024'];

	const toggleTags = (): void => {
		setIsTagsOpen((prevIsTagsOpen) => !prevIsTagsOpen);
	};
	const toggleMonths = (): void => {
		setIsMonthsOpen((prevIsMonthsOpen) => !prevIsMonthsOpen);
	};
	const toggleDays = (): void => {
		setIsDaysOpen((prevIsDaysOpen) => !prevIsDaysOpen);
	};
	const toggleYears = (): void => {
		setIsYearsOpen((prevIsYearsOpen) => !prevIsYearsOpen);
	};

	useClickOutside(tagListRef, () => {
		setIsTagsOpen(false);
	});
	useClickOutside(monthListRef, () => {
		setIsMonthsOpen(false);
	});
	useClickOutside(dayListRef, () => {
		setIsDaysOpen(false);
	});
	useClickOutside(yearListRef, () => {
		setIsYearsOpen(false);
	});

	return (
		<section className="daily-entries">
			<div className="bg-[#F2F2F2] rounded-md p-8">
				<div className="flex justify-between">
					<h1 className="font-bold">My Entries</h1>

					<div className="filters flex">
						<div className="relative">
							<div className="border-solid border-2 rounded-full bg-[#F9F9F9] pl-3 pr-2 py-1">
								<button
									type="button"
									className="flex items-center"
									onClick={toggleTags}
								>
									<span className="mr-1">Tags</span>
									<Image src={DownArrow} alt="Down arrow icon" width={18} />
								</button>

								{isTagsOpen && (
									<TagMenu
										ref={tagListRef}
										selectedTags={selectedTags}
										setSelectedTags={setSelectedTags}
										position="top-10 left-0"
									/>
								)}
							</div>
						</div>

						<div className="relative">
							<div className="border-solid border-2 rounded-full bg-[#F9F9F9] pl-3 pr-2 py-1">
								<button
									type="button"
									className="flex items-center"
									onClick={toggleMonths}
								>
									<span>Month</span>
									<Image src={DownArrow} alt="Down arrow icon" width={18} />
								</button>
								{isMonthsOpen && (
									<MonthMenu
										ref={monthListRef}
										selectedMonths={selectedMonths}
										setSelectedMonths={setSelectedMonths}
									/>
								)}
							</div>
						</div>

						<div className="relative">
							<div className="border-solid border-2 rounded-full bg-[#F9F9F9] pl-3 pr-2 py-1">
								<button
									type="button"
									className="flex items-center"
									onClick={toggleDays}
								>
									<span>Day</span>
									<Image src={DownArrow} alt="Down arrow icon" width={18} />
								</button>
								{isDaysOpen && (
									<DayMenu
										ref={dayListRef}
										selectedDays={selectedDays}
										setSelectedDays={setSelectedDays}
									/>
								)}
							</div>
						</div>

						<div className="relative">
							<div className="border-solid border-2 rounded-full bg-[#F9F9F9] pl-3 pr-2 py-1">
								<button
									type="button"
									className="flex items-center"
									onClick={toggleYears}
								>
									<span>Year</span>
									<Image src={DownArrow} alt="Down arrow icon" width={18} />
								</button>
								{isYearsOpen && (
									<YearMenu
										ref={yearListRef}
										selectedYears={selectedYears}
										setSelectedYears={setSelectedYears}
									/>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="entries">
				<div className="entry">
					<p>12.31.23</p>
					<p>
						Today, during my usual morning walk, I noticed the first daffodil of
						the season blooming in my neighbors garden. It was a vivid yellow,
						standing out against the dull winter landscape. This simple moment
						was a reminder of the resilience of nature and the promise of
						spring. It brought a sense of hope and joy, a feeling that stayed
						with me throughout the day.
					</p>
					<div>
						<div>Tag 1</div>
						<div>Tag 2</div>
					</div>
				</div>
				<div className="entry">
					<p>12.31.23</p>
					<p>
						Today, during my usual morning walk, I noticed the first daffodil of
						the season blooming in my neighbors garden. It was a vivid yellow,
						standing out against the dull winter landscape. This simple moment
						was a reminder of the resilience of nature and the promise of
						spring. It brought a sense of hope and joy, a feeling that stayed
						with me throughout the day.
					</p>
					<div>
						<div>Tag 1</div>
						<div>Tag 2</div>
					</div>
				</div>
			</div>
		</section>
	);
}

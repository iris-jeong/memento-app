import DownArrow from '../../public/down.svg';
import Image from 'next/image';
import TagMenu, { TagType } from './TagMenu';
import MonthMenu, { MonthType } from './monthMenu';
import DayMenu from './DayMenu';
import YearMenu from './YearMenu';

interface FiltersProps {
	tagsFilter: {
		isOpen: boolean;
		toggleFilter: () => void;
		selectedFilters: TagType[]; // Use TagType from the import
		handleFilterChange: (
			filters: TagType[] | ((prevTags: TagType[]) => TagType[])
		) => void;
		closeFilter: () => void;
	};
	monthsFilter: {
		isOpen: boolean;
		toggleFilter: () => void;
		selectedFilters: MonthType[]; // Use MonthType from the import
		handleFilterChange: (
			filters: MonthType[] | ((prevMonths: MonthType[]) => MonthType[])
		) => void;
		closeFilter: () => void;
	};
	daysFilter: {
		isOpen: boolean;
		toggleFilter: () => void;
		selectedFilters: number[]; // Use the appropriate type for daysFilter
		handleFilterChange: (
			filters: number[] | ((prevDays: number[]) => number[])
		) => void;
		closeFilter: () => void;
	};
	yearsFilter: {
		isOpen: boolean;
		toggleFilter: () => void;
		selectedFilters: number[]; // Use the appropriate type for yearsFilter
		handleFilterChange: (
			filters: number[] | ((prevYears: number[]) => number[])
		) => void;
		closeFilter: () => void;
	};
	tagListRef: React.RefObject<HTMLDivElement>;
	monthListRef: React.RefObject<HTMLDivElement>;
	dayListRef: React.RefObject<HTMLDivElement>;
	yearListRef: React.RefObject<HTMLDivElement>;
}

export default function Filters({
	tagsFilter,
	monthsFilter,
	daysFilter,
	yearsFilter,
	tagListRef,
	monthListRef,
	dayListRef,
	yearListRef,
}: FiltersProps) {
	return (
		<div className="filters flex my-1">
			<div className="relative">
				<div className="border-solid border-2 rounded-full bg-[#F9F9F9] pl-3 pr-2 py-1">
					<button
						type="button"
						className="flex items-center"
						onClick={tagsFilter.toggleFilter}
					>
						<span className="mr-1">Tags</span>
						<Image src={DownArrow} alt="Down arrow icon" width={18} />
					</button>

					{tagsFilter.isOpen && (
						<TagMenu
							ref={tagListRef}
							selectedTags={tagsFilter.selectedFilters}
							setSelectedTags={tagsFilter.handleFilterChange}
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
						onClick={monthsFilter.toggleFilter}
					>
						<span>Month</span>
						<Image src={DownArrow} alt="Down arrow icon" width={18} />
					</button>
					{monthsFilter.isOpen && (
						<MonthMenu
							ref={monthListRef}
							selectedMonths={monthsFilter.selectedFilters}
							setSelectedMonths={monthsFilter.handleFilterChange}
						/>
					)}
				</div>
			</div>

			<div className="relative">
				<div className="border-solid border-2 rounded-full bg-[#F9F9F9] pl-3 pr-2 py-1">
					<button
						type="button"
						className="flex items-center"
						onClick={daysFilter.toggleFilter}
					>
						<span>Day</span>
						<Image src={DownArrow} alt="Down arrow icon" width={18} />
					</button>
					{daysFilter.isOpen && (
						<DayMenu
							ref={dayListRef}
							selectedDays={daysFilter.selectedFilters}
							setSelectedDays={daysFilter.handleFilterChange}
						/>
					)}
				</div>
			</div>

			<div className="relative">
				<div className="border-solid border-2 rounded-full bg-[#F9F9F9] pl-3 pr-2 py-1">
					<button
						type="button"
						className="flex items-center"
						onClick={yearsFilter.toggleFilter}
					>
						<span>Year</span>
						<Image src={DownArrow} alt="Down arrow icon" width={18} />
					</button>
					{yearsFilter.isOpen && (
						<YearMenu
							ref={yearListRef}
							selectedYears={yearsFilter.selectedFilters}
							setSelectedYears={yearsFilter.handleFilterChange}
						/>
					)}
				</div>
			</div>
		</div>
	);
}

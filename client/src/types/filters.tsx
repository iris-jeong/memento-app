import { TagType } from '@/types/tags';

export interface TagFilterProps {
	selectedTags: TagType[];
	setSelectedTags: React.Dispatch<React.SetStateAction<TagType[]>>;
}

export interface DateFilterProps {
	selectedYear: number;
	setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
	selectedMonth: number;
	setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}

export interface DatePickerProps {
	dateFilterRef: React.RefObject<HTMLDivElement>;
	selectedYear: number;
	setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
	selectedMonth: number;
	setSelectedMonth: React.Dispatch<React.SetStateAction<number>>;
}

export const abbreviatedMonthNames = [
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

export const fullMonthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

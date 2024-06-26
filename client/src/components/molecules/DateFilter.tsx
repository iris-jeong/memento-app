import { useRef, useState } from 'react';
import Image from 'next/image';
import { DateFilterProps } from '@/types/filters';
import useClickOutside from '@/hooks/useClickOutside';
import DatePicker from '@/components/atoms/DatePicker';
import DownArrow from '../../../public/down.svg';
import UpArrow from '../../../public/up.svg';

export default function DateFilter({
	selectedYear,
	setSelectedYear,
	selectedMonth,
	setSelectedMonth,
}: DateFilterProps) {
	const dateFilterRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	useClickOutside(dateFilterRef, () => setIsOpen(false));

	return (
		<div className="relative flex justify-end ml-2">
			<div
				className={`w-fit border-2 rounded-full bg-[#F9F9F9] pl-3 pr-2 py-1  ${
					selectedMonth ? 'border-[#1945E2]' : ''
				} ${isOpen ? 'border-[#D5D5D5]' : ''}`}
			>
				<button
					type="button"
					className="flex items-center"
					aria-label="Open date filter"
					onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
				>
					<span className="mr-1">Date</span>
					<Image src={isOpen ? UpArrow : DownArrow} alt="" width={18} />
				</button>
			</div>

			{isOpen && (
				<div className="absolute top-full right-0 mt-1">
					<DatePicker
						dateFilterRef={dateFilterRef}
						selectedYear={selectedYear}
						setSelectedYear={setSelectedYear}
						selectedMonth={selectedMonth}
						setSelectedMonth={setSelectedMonth}
					/>
				</div>
			)}
		</div>
	);
}

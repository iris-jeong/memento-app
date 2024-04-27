import { useRef, useState } from 'react';
import Image from 'next/image';
import { DateFilterProps } from '@/types/filters';
import DownArrow from '../../../public/down.svg';

export default function DateFilter({
	selectedYear,
	setSelectedYear,
	selectedMonth,
	setSelectedMonth,
}: DateFilterProps) {
	const dateFilterRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative flex justify-end ml-2">
			<div className="w-fit border-2 rounded-full bg-[#F9F9F9] pl-3 pr-2 py-1">
				<button
					type="button"
					className="flex items-center"
					aria-label="Open date filter"
					onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
				>
					<span className="mr-1">Date</span>
					<Image src={DownArrow} alt="" width={18} />
				</button>
			</div>

			{isOpen && <div className="absolute top-full right-0">Date Picker</div>}
		</div>
	);
}

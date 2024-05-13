import {
	DatePickerProps,
	abbreviatedMonthNames,
	fullMonthNames,
} from '@/types/filters';
import useTrapFocus from '@/hooks/useTrapFocus';
import IconButton from '@/components/atoms/IconButton';
import LeftArrow from '../../../public/left-arrow.svg';
import LeftArrowHover from '../../../public/left-arrow-hover.svg';
import RightArrow from '../../../public/right-arrow.svg';
import RightArrowHover from '../../../public/right-arrow-hover.svg';

export default function DatePicker({
	dateFilterRef,
	selectedYear,
	setSelectedYear,
	selectedMonth,
	setSelectedMonth,
}: DatePickerProps) {
	const handleYearClick = (direction: string) => {
		if (direction === 'previous') {
			setSelectedYear(selectedYear - 1);
		} else if (direction === 'next') {
			setSelectedYear(selectedYear + 1);
		}
	};

	const handleMonthClick = (monthIndex: number) => {
		if (monthIndex !== selectedMonth) {
			setSelectedMonth(monthIndex);
		} else {
			handleClearClick();
		}
	};

	const handleClearClick = () => {
		setSelectedMonth(null);
	};

	useTrapFocus(true, dateFilterRef);

	return (
		<div ref={dateFilterRef} className="absolute z-50 top-full right-0">
			<div
				className={
					'p-5 border-2 border-[#E8E8E8] bg-[#FFFFFF] rounded-md shadow'
				}
			>
				<div className="flex justify-between w-[300px]">
					<IconButton
						icon={LeftArrow}
						hoverIcon={LeftArrowHover}
						alt="Go to previous year"
						onClick={() => handleYearClick('previous')}
						width={24}
					/>
					<div>{selectedYear}</div>
					<IconButton
						icon={RightArrow}
						hoverIcon={RightArrowHover}
						alt="Go to next year"
						onClick={() => handleYearClick('next')}
						width={24}
					/>
				</div>

				<ul
					id="month-option-list"
					aria-label="Select a month"
					role="listbox"
					aria-multiselectable="false"
					className="grid grid-cols-3 gap-2 mt-6"
				>
					{abbreviatedMonthNames.map((month, index) => {
						const isSelectedMonth = index === selectedMonth;

						return (
							<li
								key={index}
								id={`month-option-${month}`}
								role="option"
								data-value={month}
								aria-label={`${fullMonthNames[index]} ${
									isSelectedMonth ? 'is selected' : 'not selected'
								}`}
								className={`flex items-center justify-center h-12 rounded cursor-pointer hover:bg-[#f3f3f3] hover:shadow-sm ${
									isSelectedMonth ? 'font-semibold bg-[#f3f3f3] shadow-sm' : ''
								}`}
								tabIndex={0}
								onClick={() => handleMonthClick(index)}
								aria-selected={isSelectedMonth ? 'true' : 'false'}
							>
								{month}
							</li>
						);
					})}
				</ul>

				<div className="w-full flex justify-center mt-3">
					<button
						type="button"
						className={`tracking-wide ${
							selectedMonth !== null ? 'text-[#565666]' : 'text-[#D5D5D5]'
						}`}
						onClick={handleClearClick}
						disabled={selectedMonth === null}
					>
						Clear Selection
					</button>
				</div>
			</div>
		</div>
	);
}

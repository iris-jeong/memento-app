import { forwardRef } from 'react';

type Month =
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
type MonthMenuProps = {
	selectedMonths: Month[];
	setSelectedMonths: (
		tags: Month[] | ((prevMonths: Month[]) => Month[])
	) => void;
};

const MonthMenu = forwardRef<HTMLDivElement, MonthMenuProps>(function MonthMenu(
	{ selectedMonths, setSelectedMonths },
	ref
) {
	const months: Month[] = [
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

	const handleMonthChange = (month: Month, isChecked: boolean): void => {
		if (isChecked && selectedMonths.length < 3) {
			setSelectedMonths((prevMonths) => [...prevMonths, month]);
		} else {
			setSelectedMonths((prevMonths) => prevMonths.filter((m) => m !== month));
		}
	};

	return (
		<div
			ref={ref}
			className="absolute border-solid border-2 border-[#E8E8E8] bg-[#FFFFFF] rounded-md py-4 pl-4 pr-12 shadow top-10 left-0"
		>
			<ul className="px-2 xs:text-lg">
				{months.map((month) => (
					<li key={month} className="flex items-center">
						<input
							type="checkbox"
							id={`month-${month.toLowerCase()}`}
							className="mr-3 scale-125"
							onChange={(e) => handleMonthChange(month, e.target.checked)}
							checked={selectedMonths.includes(month)}
							disabled={
								selectedMonths.length >= 3 && !selectedMonths.includes(month)
							}
						/>
						<label htmlFor={`month-${month.toLowerCase()}`}>{month}</label>
					</li>
				))}
			</ul>
		</div>
	);
});

export default MonthMenu;

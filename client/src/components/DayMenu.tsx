import { forwardRef } from 'react';

type DayMenuProps = {
	selectedDays: number[];
	setSelectedDays: (
		days: number[] | ((prevDays: number[]) => number[])
	) => void;
};
const days = [
	1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
	23, 24, 25, 26, 27, 28, 29, 30, 31,
];

const DayMenu = forwardRef<HTMLDivElement, DayMenuProps>(function DayMenu(
	{ selectedDays, setSelectedDays },
	ref
) {
	const handleDayChange = (day: number, isChecked: boolean): void => {
		if (isChecked) {
			setSelectedDays((prevDays) => [...prevDays, day]);
		} else {
			setSelectedDays((prevDays) => prevDays.filter((d) => d !== day));
		}
	};

	return (
		<div
			ref={ref}
			className="absolute border-solid border-2 border-[#E8E8E8] bg-[#FFFFFF] rounded-md py-4 pl-4 pr-12 shadow top-10 left-0"
		>
			<ul className="px-2 xs:text-lg">
				{days.map((day) => (
					<li key={day} className="flex items-center">
						<input
							type="checkbox"
							id={`day-${day}`}
							className="mr-3 scale-125"
							onChange={(e) => handleDayChange(day, e.target.checked)}
							checked={selectedDays.includes(day)}
							disabled={selectedDays.length >= 3 && !selectedDays.includes(day)}
						/>
						<label htmlFor={`day-${day}`}>{day}</label>
					</li>
				))}
			</ul>
		</div>
	);
});

export default DayMenu;

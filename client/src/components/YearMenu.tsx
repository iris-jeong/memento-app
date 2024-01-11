import { forwardRef } from 'react';

type YearMenuProps = {
	selectedYears: number[];
	setSelectedYears: (
		years: number[] | ((prevYears: number[]) => number[])
	) => void;
};
const years = [2021, 2022, 2023];

const YearMenu = forwardRef<HTMLDivElement, YearMenuProps>(function YearMenu(
	{ selectedYears, setSelectedYears },
	ref
) {
	const handleYearChange = (year: number, isChecked: boolean): void => {
		if (isChecked) {
			setSelectedYears((prevYear) => [...prevYear, year]);
		} else {
			setSelectedYears((prevYears) => prevYears.filter((y) => y !== year));
		}
	};

	return (
		<div
			ref={ref}
			className="absolute border-solid border-2 border-[#E8E8E8] bg-[#FFFFFF] rounded-md py-4 pl-4 pr-12 shadow top-10 left-0"
		>
			<ul className="px-2 xs:text-lg">
				{years.map((year) => (
					<li key={year} className="flex items-center">
						<input
							type="checkbox"
							id={`year-${year}`}
							className="mr-3 scale-125"
							onChange={(e) => handleYearChange(year, e.target.checked)}
							checked={selectedYears.includes(year)}
							disabled={
								selectedYears.length >= 3 && !selectedYears.includes(year)
							}
						/>
						<label htmlFor={`year-${year}`}>{year}</label>
					</li>
				))}
			</ul>
		</div>
	);
});

export default YearMenu;

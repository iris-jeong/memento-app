'use client';
import DownArrow from '../../public/down.svg';
import Image from 'next/image';
import { useState } from 'react';

export default function DailyEntries() {
	const [isTagsOpen, setIsTagsOpen] = useState<boolean>(false);
	const [isMonthsOpen, setIsMonthsOpen] = useState<boolean>(false);
	const [isDaysOpen, setIsDaysOpen] = useState<boolean>(false);
	const [isYearsOpen, setIsYearsOpen] = useState<boolean>(false);

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

	return (
		<section className="daily-entries">
			<div className="bg-[#F2F2F2] rounded-md p-8">
				<div className="flex justify-between">
					<h1 className="font-bold">My Entries</h1>

					<div className="filters flex">
						<div className="border-solid border-2 rounded-full bg-[#F9F9F9] pl-4 pr-3 py-2">
							<button
								type="button"
								className="flex items-center"
								onClick={toggleTags}
							>
								<span className="mr-1">Tags</span>
								<Image src={DownArrow} alt="Down arrow icon" width={18} />
							</button>

							{isTagsOpen && (
								<ul className="tags">
									{tags.map((tag) => (
										<li key={tag}>
											<input type="checkbox" id={`tag-${tag.toLowerCase()}`} />
											<label htmlFor={`tag-${tag.toLowerCase()}`}>{tag}</label>
										</li>
									))}
								</ul>
							)}
						</div>

						<button type="button">Month</button>
						{isMonthsOpen && (
							<ul className="tags">
								<li>
									<input type="checkbox" id="january" />
									<label htmlFor="january">January</label>
								</li>
								<li>
									<input type="checkbox" id="february" />
									<label htmlFor="february">February</label>
								</li>
								<li>
									<input type="checkbox" id="march" />
									<label htmlFor="march">March</label>
								</li>
								<li>
									<input type="checkbox" id="april" />
									<label htmlFor="april">April</label>
								</li>
								<li>
									<input type="checkbox" id="may" />
									<label htmlFor="may">May</label>
								</li>
							</ul>
						)}

						<button type="button">Day</button>
						{isDaysOpen && (
							<ul className="days">
								<li>
									<input type="checkbox" id="one" />
									<label htmlFor="one">1</label>
								</li>
								<li>
									<input type="checkbox" id="two" />
									<label htmlFor="two">2</label>
								</li>
								<li>
									<input type="checkbox" id="three" />
									<label htmlFor="three">3</label>
								</li>
								<li>
									<input type="checkbox" id="four" />
									<label htmlFor="four">4</label>
								</li>
							</ul>
						)}

						<button type="button">Year</button>
						{isYearsOpen && (
							<ul className="years">
								<li>
									<input type="checkbox" id="2022" />
									<label htmlFor="2022">2022</label>
								</li>
								<li>
									<input type="checkbox" id="2023" />
									<label htmlFor="2023">2023</label>
								</li>
								<li>
									<input type="checkbox" id="2024" />
									<label htmlFor="2024">2024</label>
								</li>
							</ul>
						)}
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

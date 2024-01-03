export default function DailyEntries() {
	return (
		<section className="daily-entries">
			<div>
				<h1>DAILY ENTRIES</h1>
				<div className="filters">
					<button type="button">Tag</button>
					<ul className="tags">
						<li>
							<input type="checkbox" id="tag-event" />
							<label htmlFor="tag-event">Event</label>
						</li>
						<li>
							<input type="checkbox" id="tag-conversation" />
							<label htmlFor="tag-conversation">Conversation</label>
						</li>
						<li>
							<input type="checkbox" id="tag-feeling" />
							<label htmlFor="tag-feeling">Feeling</label>
						</li>
						<li>
							<input type="checkbox" id="tag-realization" />
							<label htmlFor="tag-realization">Realization</label>
						</li>
						<li>
							<input type="checkbox" id="tag-observation" />
							<label htmlFor="tag-observation">Observation</label>
						</li>
					</ul>

					<button type="button">Month</button>
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

					<button type="button">Day</button>
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

					<button type="button">Year</button>
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

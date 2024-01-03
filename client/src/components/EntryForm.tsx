'use client';
import Image from 'next/image';
import AddIcon from '../../public/add.svg';
import { useState } from 'react';

export default function EntryForm() {
	const [isTagsOpen, setIsTagsOpen] = useState(false);

	return (
		<section className="w-8/12 max-w-[850px] mx-auto my-12">
			<form
				action=""
				method="POST"
				className="flex flex-col align-center justify-center"
			>
				<p className="text-center text-[#1945E2] font-semibold">1.2.24</p>
				<h1 className="text-center text-2xl mt-2 mb-6">
					Write 1-3 sentences about the most memorable event, conversation,
					feeling, realization, or observation that happened today.
				</h1>
				<textarea
					id="entry-input"
					name="entry-input"
					rows={1}
					maxLength={300}
					required
					aria-label="Entry input"
					placeholder="Today's entry..."
					className="border-solid border-2 border-[#E8E8E8] rounded bg-[#F6F6F6] resize-none p-4 mb-4 focus:outline-none"
				></textarea>
				<div>
					<button type="button" className="flex items-center">
						<Image src={AddIcon} alt="Add entry icon" width={16} />
						<p className="pl-1 font-medium">Tags</p>
					</button>
					<div className="entry-tags"></div>
				</div>

				{isTagsOpen && (
					<div className="tag-list">
						<input type="text" placeholder="Create new tag"></input>

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
					</div>
				)}

				<button
					type="submit"
					className="rounded-full bg-[#1945E2] w-36 h-14 text-white font-semibold mx-auto"
				>
					Add Entry
				</button>
			</form>
		</section>
	);
}

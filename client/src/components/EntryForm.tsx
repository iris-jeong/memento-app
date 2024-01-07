'use client';
import Image from 'next/image';
import AddIcon from '../../public/add.svg';
import CloseIcon from '../../public/close.svg';
import { useState, useEffect, useRef, ChangeEvent } from 'react';

type Tag = 'Event' | 'Conversation' | 'Feeling' | 'Realization' | 'Observation';

export default function EntryForm() {
	const [isTagsOpen, setIsTagsOpen] = useState<boolean>(false);
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [charCount, setCharCount] = useState<number>(0);
	const tagListRef = useRef<HTMLDivElement>(null);

	const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const newText = event.target.value;
		setCharCount(newText.length);
	};

	const toggleTagMenu = (): void => {
		console.log(`toggling from  ${isTagsOpen} to ${!isTagsOpen}`);
		setIsTagsOpen((prevIsTagsOpen) => !prevIsTagsOpen);
	};

	const handleTagChange = (tag: Tag, isChecked: boolean): void => {
		if (isChecked && selectedTags.length < 3) {
			setSelectedTags((prevTags) => [...prevTags, tag]);
		} else {
			setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
		}
	};

	const removeTag = (tag: Tag): void => {
		setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
	};

	useEffect(() => {
		function handleClickOutside(event: MouseEvent): void {
			if (
				tagListRef.current &&
				!tagListRef.current.contains(event.target as Node)
			) {
				setIsTagsOpen(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return (): void => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [tagListRef]);

	return (
		<section className="w-5/6 sm:4/5 md:3/4 lg:w-2/3 max-w-[640px] mx-auto my-12">
			<form
				action=""
				method="POST"
				className="flex flex-col align-center justify-center"
			>
				<p className="text-center text-[#1945E2] font-semibold text-lg sm:text-xl md:2xl lg:3xl">
					1.2.24
				</p>
				<h1 className="text-center text-lg xs:text-2xl md:text-3xl mt-2 mb-6">
					Write 1-3 sentences about the most memorable event, conversation,
					feeling, realization, or observation that happened today.
				</h1>
				<div className="relative w-full">
					<textarea
						id="entry-input"
						name="entry-input"
						rows={5}
						maxLength={300}
						required
						aria-label="Entry input"
						placeholder="Today's entry..."
						className="w-full border-solid border-2 border-[#E8E8E8] rounded-md bg-[#F6F6F6] p-4 mb-4 focus:outline-none resize-none"
						onChange={handleTextChange}
					></textarea>
					<div className="flex text-xs absolute right-0 bottom-8 right-3 text-[#838383]">
						<span>{charCount}</span>
						<span>/300</span>
					</div>
				</div>

				<div className="relative -mt-2">
					<div className="entry-tags flex w-full">
						<div className="flex items-center flex-wrap">
							<button
								type="button"
								className="flex items-center mr-4 mb-2"
								onClick={toggleTagMenu}
							>
								<Image src={AddIcon} alt="Add tags icon" width={20} />
								<p className="pl-1 font-semibold">Tags</p>
							</button>

							{selectedTags.map((tag) => (
								<div
									key={tag}
									className="flex items-center border-solid border-2 bg-[#F9F9F9] rounded-full px-3 py-1 text-xs mr-2 mb-2 font-sans"
								>
									<p>#{tag}</p>
									<button type="button" onClick={() => removeTag(tag)}>
										<Image
											src={CloseIcon}
											alt="Close icon"
											width={14}
											className="ml-2"
										/>
									</button>
								</div>
							))}
						</div>
					</div>

					{isTagsOpen && (
						<div
							ref={tagListRef}
							className="absolute border-solid border-2 border-[#E8E8E8] bg-[#FFFFFF] rounded-md py-4 pl-4 pr-12 shadow"
						>
							<ul className="px-2 xs:text-lg">
								<li className="mb-2">
									<input
										type="checkbox"
										id="tag-event"
										className="mr-3 scale-125"
										onChange={(e) => handleTagChange('Event', e.target.checked)}
										checked={selectedTags.includes('Event')}
										disabled={
											selectedTags.length >= 3 &&
											!selectedTags.includes('Event')
										}
									/>
									<label htmlFor="tag-event">Event</label>
								</li>
								<li className="mb-2">
									<input
										type="checkbox"
										id="tag-conversation"
										className="mr-3 scale-125"
										checked={selectedTags.includes('Conversation')}
										onChange={(e) =>
											handleTagChange('Conversation', e.target.checked)
										}
										disabled={
											selectedTags.length >= 3 &&
											!selectedTags.includes('Conversation')
										}
									/>
									<label htmlFor="tag-conversation">Conversation</label>
								</li>
								<li className="mb-2">
									<input
										type="checkbox"
										id="tag-feeling"
										className="mr-3 scale-125"
										checked={selectedTags.includes('Feeling')}
										onChange={(e) =>
											handleTagChange('Feeling', e.target.checked)
										}
									/>
									<label htmlFor="tag-feeling">Feeling</label>
								</li>
								<li className="mb-2">
									<input
										type="checkbox"
										id="tag-realization"
										className="mr-3 scale-125"
										checked={selectedTags.includes('Realization')}
										onChange={(e) =>
											handleTagChange('Realization', e.target.checked)
										}
										disabled={
											selectedTags.length >= 3 &&
											!selectedTags.includes('Realization')
										}
									/>
									<label htmlFor="tag-realization">Realization</label>
								</li>
								<li className="">
									<input
										type="checkbox"
										id="tag-observation"
										className="mr-3 scale-125"
										checked={selectedTags.includes('Observation')}
										onChange={(e) =>
											handleTagChange('Observation', e.target.checked)
										}
										disabled={
											selectedTags.length >= 3 &&
											!selectedTags.includes('Observation')
										}
									/>
									<label htmlFor="tag-observation">Observation</label>
								</li>
							</ul>
						</div>
					)}
				</div>

				<button
					type="submit"
					className="rounded-full bg-[#1945E2] w-36 h-14 text-white font-semibold mx-auto mt-8 font-sans"
				>
					Add Entry
				</button>
			</form>
		</section>
	);
}

'use client';
import Image from 'next/image';
import AddIcon from '../../public/add.svg';
import CloseIcon from '../../public/close.svg';
import { useState, useEffect, useRef, ChangeEvent, useCallback } from 'react';
import TagMenu from './TagMenu';
import Tag from './Tag';

type TagType =
	| 'Event'
	| 'Conversation'
	| 'Feeling'
	| 'Realization'
	| 'Observation';

export default function EntryForm() {
	const [isTagsOpen, setIsTagsOpen] = useState<boolean>(false);
	const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
	const [text, setText] = useState<string>('');
	const tagListRef = useRef<HTMLDivElement>(null);

	const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setText(event.target.value);
	};

	const toggleTagMenu = (): void => {
		setIsTagsOpen((prevIsTagsOpen) => !prevIsTagsOpen);
	};

	const removeTag = (tag: TagType): void => {
		setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
	};

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (
				tagListRef.current &&
				!tagListRef.current.contains(event.target as Node)
			) {
				setIsTagsOpen(false);
			}
		},
		[tagListRef]
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return (): void => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside, tagListRef]);

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
						value={text}
					></textarea>
					<div className="flex text-xs absolute right-0 bottom-8 right-3 text-[#838383]">
						<span>{text.length}</span>
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

							<ul className="flex">
								{selectedTags.map((tag) => (
									<Tag key={tag} tag={tag} removeTag={removeTag} />
								))}
							</ul>
						</div>
					</div>

					{isTagsOpen && (
						<TagMenu
							ref={tagListRef}
							selectedTags={selectedTags}
							setSelectedTags={setSelectedTags}
						/>
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

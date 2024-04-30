import { useRef, useState } from 'react';
import Image from 'next/image';
import { TagType, TagSelector } from '@/types/tags';
import useClickOutside from '@/hooks/useClickOutside';
import TagOptions from '@/components/atoms/TagOptions';
import Tag from '@/components/atoms/Tag';
import AddIcon from '../../../public/add.svg';

export default function TagSelector({
	selectedTags,
	setSelectedTags,
}: TagSelector) {
	const tagOptionsRef = useRef<HTMLDivElement>(null);
	const [tagOptionsIsOpen, setTagOptionsIsOpen] = useState<boolean>(false);

	const toggleTagOptions = (): void => {
		setTagOptionsIsOpen((prevIsTagOptionsIsOpen) => !prevIsTagOptionsIsOpen);
	};

	const removeTag = (tag: TagType): void => {
		setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
	};

	useClickOutside(tagOptionsRef, () => setTagOptionsIsOpen(false));

	return (
		<div className="relative -mt-2">
			<div className="entry-tags flex w-full">
				<div className="flex items-center flex-wrap">
					<button
						type="button"
						className="flex items-center mr-4"
						onClick={toggleTagOptions}
					>
						<Image src={AddIcon} alt="Add tags icon" width={20} />
						<p className="pl-1 font-semibold">Tags</p>
					</button>

					<ul className="flex">
						{selectedTags.map((tag) => (
							<Tag key={tag._id} tag={tag} removeTag={removeTag} />
						))}
					</ul>
				</div>
			</div>

			{tagOptionsIsOpen && (
				<TagOptions
					tagOptionsRef={tagOptionsRef}
					selectedTags={selectedTags}
					setSelectedTags={setSelectedTags}
					tagOptionsIsOpen={tagOptionsIsOpen}
					maxTags={3}
				/>
			)}
		</div>
	);
}

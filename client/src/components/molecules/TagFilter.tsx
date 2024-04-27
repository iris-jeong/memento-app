import { useRef, useState } from 'react';
import Image from 'next/image';
import { TagFilterProps } from '@/types/filters';
import useClickOutside from '@/hooks/useClickOutside';
import TagOptions from '@/components/atoms/TagOptions';
import DownArrow from '../../../public/down.svg';

export default function TagFilter({
	selectedTags,
	setSelectedTags,
}: TagFilterProps) {
	const tagOptionsRef = useRef<HTMLDivElement>(null);
	const [tagOptionsIsOpen, setTagOptionsIsOpen] = useState<boolean>(false);

	useClickOutside(tagOptionsRef, () => setTagOptionsIsOpen(false));

	return (
		<div className="relative flex justify-end">
			<div className="w-fit border-2 rounded-full bg-[#F9F9F9] pl-3 pr-2 py-1">
				<button
					type="button"
					className="flex items-center"
					aria-label="Open tags filter"
					onClick={() => setTagOptionsIsOpen((prevIsOpen) => !prevIsOpen)}
				>
					<span className="mr-1">Tags</span>
					<Image src={DownArrow} alt="" width={18} />
				</button>
			</div>

			{tagOptionsIsOpen && (
				<TagOptions
					tagOptionsRef={tagOptionsRef}
					selectedTags={selectedTags}
					setSelectedTags={setSelectedTags}
					tagOptionsIsOpen={tagOptionsIsOpen}
					position="top-full right-0"
				/>
			)}
		</div>
	);
}

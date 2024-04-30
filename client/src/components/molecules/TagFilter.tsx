import { useRef, useState } from 'react';
import Image from 'next/image';
import { TagFilterProps } from '@/types/filters';
import useClickOutside from '@/hooks/useClickOutside';
import TagOptions from '@/components/atoms/TagOptions';
import DownArrow from '../../../public/down.svg';
import UpArrow from '../../../public/up.svg';

export default function TagFilter({
	selectedTags,
	setSelectedTags,
}: TagFilterProps) {
	const tagOptionsRef = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useClickOutside(tagOptionsRef, () => setIsOpen(false));

	return (
		<div className="relative flex justify-end">
			<div
				className={`w-fit border-2 rounded-full bg-[#F9F9F9] pl-3 pr-2 py-1 ${
					isOpen ? 'border-[#D5D5D5]' : ''
				}`}
			>
				<button
					type="button"
					className="flex items-center"
					aria-label="Open tags filter"
					onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
				>
					<span className="mr-1">Tags</span>
					<Image src={isOpen ? UpArrow : DownArrow} alt="" width={18} />
				</button>
			</div>

			{isOpen && (
				<TagOptions
					tagOptionsRef={tagOptionsRef}
					selectedTags={selectedTags}
					setSelectedTags={setSelectedTags}
					tagOptionsIsOpen={isOpen}
					maxTags={5}
					position="top-full right-0"
				/>
			)}
		</div>
	);
}

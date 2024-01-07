import { forwardRef } from 'react';

type Tag = 'Event' | 'Conversation' | 'Feeling' | 'Realization' | 'Observation';
type TagMenuProps = {
	selectedTags: Tag[];
	setSelectedTags: (tags: Tag[] | ((prevTags: Tag[]) => Tag[])) => void;
};

const TagMenu = forwardRef<HTMLDivElement, TagMenuProps>(function TagMenu(
	{ selectedTags, setSelectedTags },
	ref
) {
	const tags: Tag[] = [
		'Event',
		'Conversation',
		'Feeling',
		'Realization',
		'Observation',
	];

	const handleTagChange = (tag: Tag, isChecked: boolean): void => {
		if (isChecked && selectedTags.length < 3) {
			setSelectedTags((prevTags) => [...prevTags, tag]);
		} else {
			setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
		}
	};

	return (
		<div
			ref={ref}
			className="absolute border-solid border-2 border-[#E8E8E8] bg-[#FFFFFF] rounded-md py-4 pl-4 pr-12 shadow"
		>
			<ul className="px-2 xs:text-lg">
				{tags.map((tag) => (
					<>
						<input
							type="checkbox"
							id={`tag-${tag.toLowerCase()}`}
							className="mr-3 scale-125"
							onChange={(e) => handleTagChange(tag, e.target.checked)}
							checked={selectedTags.includes(tag)}
							disabled={selectedTags.length >= 3 && !selectedTags.includes(tag)}
						/>
						<label htmlFor={`tag-${tag.toLowerCase()}`}>Event</label>
					</>
				))}
			</ul>
		</div>
	);
});

export default TagMenu;

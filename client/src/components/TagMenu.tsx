import { forwardRef } from 'react';

export type TagType =
	| 'Event'
	| 'Conversation'
	| 'Feeling'
	| 'Realization'
	| 'Observation';

type TagMenuProps = {
	selectedTags: TagType[];
	setSelectedTags: (
		tags: TagType[] | ((prevTags: TagType[]) => TagType[])
	) => void;
	position: string;
};

const TagMenu = forwardRef<HTMLDivElement, TagMenuProps>(function TagMenu(
	{ selectedTags, setSelectedTags, position },
	ref
) {
	const tags: TagType[] = [
		'Event',
		'Conversation',
		'Feeling',
		'Realization',
		'Observation',
	];

	const handleTagChange = (tag: TagType, isChecked: boolean): void => {
		if (isChecked && selectedTags.length < 3) {
			setSelectedTags((prevTags) => [...prevTags, tag]);
		} else {
			setSelectedTags((prevTags) => prevTags.filter((t) => t !== tag));
		}
	};

	return (
		<div
			ref={ref}
			className={`absolute border-solid border-2 border-[#E8E8E8] bg-[#FFFFFF] rounded-md py-4 pl-4 pr-12 shadow ${position}`}
		>
			<ul className="px-2 xs:text-lg">
				{tags.map((tag) => (
					<li key={tag} className="flex items-center">
						<input
							type="checkbox"
							id={`tag-${tag.toLowerCase()}`}
							className="mr-3 scale-125"
							onChange={(e) => handleTagChange(tag, e.target.checked)}
							checked={selectedTags.includes(tag)}
							disabled={selectedTags.length >= 3 && !selectedTags.includes(tag)}
						/>
						<label htmlFor={`tag-${tag.toLowerCase()}`}>{tag}</label>
					</li>
				))}
			</ul>
		</div>
	);
});

export default TagMenu;

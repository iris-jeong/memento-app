import { forwardRef, useEffect, useState } from 'react';
import { TagType } from './Tag';

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
	const [tags, setTags] = useState<TagType[]>([]);
	useEffect(() => {
		fetchTags().then(setTags).catch(console.error);
	}, []);

	const token = localStorage.getItem('token');
	// If there's no token, redirect user to login page.
	if (!token) {
		console.error('Authentication required');
		return;
	}
	const fetchTags = async (): Promise<TagType[]> => {
		const response = await fetch('http://localhost:3001/api/tags', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		if (!response.ok) {
			throw new Error('Failed to fetch tags');
		}
		const tags = await response.json();

		return tags;
	};

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
			className={`absolute border-solid border-2 border-[#E8E8E8] bg-[#FFFFFF] rounded-md py-4 pl-4 pr-12 shadow-sm ${position}`}
		>
			<ul className="px-2 xs:text-lg">
				{tags.map((tag) => (
					<li key={tag._id} className="flex items-center">
						<input
							type="checkbox"
							id={`tag-${tag.name.toLowerCase()}`}
							className="mr-3 scale-125"
							onChange={(e) => handleTagChange(tag, e.target.checked)}
							checked={selectedTags.includes(tag)}
							disabled={selectedTags.length >= 3 && !selectedTags.includes(tag)}
						/>
						<label htmlFor={`tag-${tag.name.toLowerCase()}`}>{tag.name}</label>
					</li>
				))}
			</ul>
		</div>
	);
});

export default TagMenu;

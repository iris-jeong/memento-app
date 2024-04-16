import { getTags } from '@/api/tags';
import { useEffect, useState } from 'react';
import { TagType } from '../Tag';
import { TagOptionsProps } from '@/types/tags';

export default function TagOptions({
	tagOptionsRef,
	selectedTags,
	setSelectedTags,
	position,
}: TagOptionsProps) {
	const [tags, setTags] = useState<TagType[]>([]);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			console.error('Authentication required');
			return;
		}

		const cachedTags = sessionStorage.getItem('tags');
		if (cachedTags) {
			setTags(JSON.parse(cachedTags));
		} else {
			getTags(token)
				.then((fetchedTags) => {
					sessionStorage.setItem('tags', JSON.stringify(fetchedTags));
					setTags(fetchedTags);
					console.log('fetched tags: ', fetchedTags);
				})
				.catch(console.error);
		}
	}, []);

	const handleTagChange = (tag: TagType, isChecked: boolean): void => {
		if (isChecked && selectedTags.length < 3) {
			setSelectedTags((prevTags) => [...prevTags, tag]);
		} else {
			setSelectedTags((prevTags) => prevTags.filter((t) => t._id !== tag._id));
		}
	};

	return (
		<div
			ref={tagOptionsRef}
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
							checked={selectedTags.some(
								(selectedTag) => selectedTag._id === tag._id
							)}
							disabled={
								selectedTags.length >= 3 &&
								!selectedTags.some((selectedTag) => selectedTag._id === tag._id)
							}
						/>
						<label htmlFor={`tag-${tag.name.toLowerCase()}`}>{tag.name}</label>
					</li>
				))}
			</ul>
		</div>
	);
}

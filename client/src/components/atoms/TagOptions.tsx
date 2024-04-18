import { getTags } from '@/api/tags';
import { useEffect, useState } from 'react';
import { TagType } from '../Tag';
import { TagOptionsProps } from '@/types/tags';
import Image from 'next/image';
import TagIcon from '../../../public/tag.svg';
import Checkbox from '../../../public/checkbox.svg';
import CheckboxChecked from '../../../public/checkbox-checked.svg';
import CheckboxDisabled from '../../../public/checkbox-disabled.svg';

export default function TagOptions({
	tagOptionsRef,
	selectedTags,
	setSelectedTags,
	position,
}: TagOptionsProps) {
	const [tags, setTags] = useState<TagType[]>([]);
	const maxTagsAllowed = 3;

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
		if (isChecked && selectedTags.length < maxTagsAllowed) {
			setSelectedTags((prevTags) => [...prevTags, tag]);
		} else {
			setSelectedTags((prevTags) => prevTags.filter((t) => t._id !== tag._id));
		}
	};

	return (
		<div ref={tagOptionsRef} className="absolute z-50 w-[240px]">
			<ul
				id="tag-option-list"
				className={`border-2 border-[#E8E8E8] bg-[#FFFFFF] rounded-md shadow ${position}`}
				aria-label="Select a tag"
				role="listbox"
				aria-multiselectable="true"
			>
				{tags.map((tag) => {
					const isDisabled =
						selectedTags.length >= maxTagsAllowed &&
						!selectedTags.some((selectedTag) => selectedTag._id === tag._id);
					const isChecked = selectedTags.some(
						(selectedTag) => selectedTag._id === tag._id
					);
					const checkboxSrc = isDisabled
						? CheckboxDisabled
						: isChecked
						? CheckboxChecked
						: Checkbox;

					return (
						<li
							key={tag._id}
							id={`tag-option-${tag.name}`}
							role="option"
							data-value={tag.name}
							aria-label={`${tag.name}, ${isChecked} ? 'selected' : 'not selected`}
							aria-selected={isChecked}
							aria-checked={isChecked}
							aria-disabled={isDisabled}
							onClick={() => !isDisabled && handleTagChange(tag, !isChecked)}
							tabIndex={0}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									handleTagChange(tag, !isChecked);
								}
							}}
							className="flex items-center justify-between py-[6px] px-[8px] hover:bg-[#f3f3f3] cursor-pointer"
						>
							<span className="flex">
								<Image src={TagIcon} width={20} aria-hidden="true" alt="" />
								<label
									className={`ml-1 ${
										isDisabled ? 'cursor-default' : 'cursor-pointer'
									}`}
									htmlFor={`tag-${tag.name.toLowerCase()}`}
								>
									{tag.name}
								</label>
							</span>

							<span>
								<Image src={checkboxSrc} width={20} alt="Checkbox" />
							</span>
						</li>
					);
				})}
			</ul>
			{selectedTags.length === 3 && (
				<div
					aria-live="polite"
					aria-atomic="true"
					className="flex justify-end mt-1"
				>
					<span className="w-fit rounded px-4 py-2 bg-[#1945E2] text-white text-sm tracking-wide">
						Up to 3 tags allowed
					</span>
				</div>
			)}
		</div>
	);
}

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { TagType } from '@/types/tags';
import { TagOptionsProps } from '@/types/tags';
import { useTags } from '@/hooks/useTags';
import useTrapFocus from '@/hooks/useTrapFocus';
import TagIcon from '../../../public/tag.svg';
import Checkbox from '../../../public/checkbox.svg';
import CheckboxChecked from '../../../public/checkbox-checked.svg';
import CheckboxDisabled from '../../../public/checkbox-disabled.svg';

export default function TagOptions({
	tagOptionsRef,
	selectedTags,
	setSelectedTags,
	tagOptionsIsOpen,
	position,
}: TagOptionsProps) {
	const [tags, loading] = useTags();
	const [searchTerm, setSearchTerm] = useState('');
	const maxTagsAllowed = 3;

	const handleTagChange = (tag: TagType, isChecked: boolean): void => {
		if (isChecked && selectedTags.length < maxTagsAllowed) {
			setSelectedTags((prevTags) => [...prevTags, tag]);
		} else {
			setSelectedTags((prevTags) => prevTags.filter((t) => t._id !== tag._id));
		}
	};

	const handleOnKeyDown = (
		e: React.KeyboardEvent,
		tag: TagType,
		isChecked: boolean
	) => {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			handleTagChange(tag, !isChecked);
		}
	};

	const filteredTags = useMemo(() => {
		if (!searchTerm.trim()) return tags;

		// Regex pattern to match tags containing all letters of searchTerm in any order.
		const pattern = searchTerm
			.trim()
			.toLowerCase()
			.split('')
			.reduce((acc, char) => {
				// Escape special regex characters just in case they are typed into the search.
				const escapedChar = char.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
				return acc + '(?=.*' + escapedChar + ')';
			}, '');

		const regex = new RegExp(pattern, 'i');

		return tags.filter((tag) => regex.test(tag.name));
	}, [tags, searchTerm]);

	useTrapFocus(tagOptionsIsOpen, tagOptionsRef);

	return (
		<div
			ref={tagOptionsRef}
			className={`absolute z-50 w-[280px] mt-1 ${position}`}
		>
			<div
				className={'border-2 border-[#E8E8E8] bg-[#FFFFFF] rounded-md shadow'}
			>
				<div className="p-2">
					<input
						type="text"
						placeholder="Search tags..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className="w-full p-2 border-2 border-[#E8E8E8] rounded-md focus:outline-none focus:border-[#D2D2D2]"
					/>
				</div>
				<ul
					id="tag-option-list"
					aria-label="Select a tag"
					role="listbox"
					aria-multiselectable="true"
				>
					{filteredTags.map((tag) => {
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
								aria-label={`${tag.name}, ${
									isChecked ? 'selected' : 'not selected'
								}`}
								aria-selected={isChecked}
								aria-checked={isChecked}
								aria-disabled={isDisabled}
								onClick={() => !isDisabled && handleTagChange(tag, !isChecked)}
								tabIndex={0}
								onKeyDown={(e) => handleOnKeyDown(e, tag, isChecked)}
								className="flex items-center justify-between py-[6px] px-3 hover:bg-[#f3f3f3] cursor-pointer"
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
			</div>
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

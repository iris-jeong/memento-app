import React, { useRef } from 'react';
import Tag from './atoms/Tag';
import { EntryProps } from '@/types/entries';
import useMultilineEllipsis from '@/hooks/useMultilineEllipsis';

export default function Entry({
	date,
	content,
	tags,
	handleEntryClick,
}: EntryProps) {
	const dateObj = new Date(date);
	const formattedDate = dateObj.toLocaleDateString();
	const textRef = useRef<HTMLParagraphElement>(null);
	const maxHeight = 200;
	const truncatedText = useMultilineEllipsis(textRef, content, maxHeight);

	return (
		<div
			className="border-solid border-2 p-4 mx-3 h-[300px] md:w-[46.85%] xl:w-[31%] bg-white rounded-md mb-4 hover:shadow hover:cursor-pointer"
			onClick={handleEntryClick}
		>
			<p className="font-bold mb-2">{formattedDate}</p>
			<p ref={textRef} className="h-[200px] overflow-hidden mb-2">
				{truncatedText}
			</p>
			<div className="flex -ml-1">
				{tags && tags.map((tag) => <Tag key={tag._id} tag={tag} />)}
			</div>
		</div>
	);
}

import React, { useRef } from 'react';
import Tag, { TagType } from './Tag';
import useMultilineEllipsis from '@/hooks/useMultilineEllipsis';
interface EntryProps {
	date: Date;
	text: string;
	tags: TagType[];
	handleEntryClick: () => void;
}

export default function Entry({
	date,
	text,
	tags,
	handleEntryClick,
}: EntryProps) {
	const formattedDate = date.toLocaleDateString();
	const textRef = useRef<HTMLParagraphElement>(null);
	const maxHeight = 200;
	const truncatedText = useMultilineEllipsis(textRef, text, maxHeight);

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
				{tags.map((tag) => (
					<Tag key={tag._id} tag={tag} />
				))}
			</div>
		</div>
	);
}

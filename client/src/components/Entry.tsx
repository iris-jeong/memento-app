import React, { useRef } from 'react';
import Tag, { TagType } from './Tag';
import useMultilineEllipsis from '@/hooks/useMultilineEllipsis';

interface EntryProps {
	date: Date;
	text: string;
	tags: TagType[];
}

export default function Entry({ date, text, tags }: EntryProps) {
	const formattedDate = date.toLocaleDateString();
	const textRef = useRef<HTMLParagraphElement>(null);
	const maxHeight = 200;
	const truncatedText = useMultilineEllipsis(textRef, text, maxHeight);

	return (
		<div className="border-solid border-2 m-2 p-4 h-[300px] bg-white rounded-lg">
			<p className="font-bold mb-2">{formattedDate}</p>
			<p ref={textRef} className="h-[200px] overflow-hidden mb-2">
				{truncatedText}
			</p>
			<div className="flex -ml-1">
				{tags.map((tag) => (
					<Tag key={tag} tag={tag} />
				))}
			</div>
		</div>
	);
}

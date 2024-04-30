import React, { useRef } from 'react';
import { EntryProps } from '@/types/entries';
import useMultilineEllipsis from '@/hooks/useMultilineEllipsis';
import Tag from '@/components/atoms/Tag';

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

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter' || e.key === ' ') {
			handleEntryClick();
		}
	};

	return (
		<div
			className="border-2 p-4 h-[300px] bg-white rounded-md hover:shadow hover:cursor-pointer"
			role="button"
			tabIndex={0}
			aria-label="View entry details"
			onClick={handleEntryClick}
			onKeyDown={(e) => handleKeyDown(e)}
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

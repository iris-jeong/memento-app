import Tag, { TagType } from './Tag';

interface EntryProps {
	date: Date;
	text: string;
	tags: TagType[];
}

export default function Entry({ date, text, tags }: EntryProps) {
	const formattedDate = date.toLocaleDateString();

	return (
		<div className="">
			<p>{formattedDate}</p>
			<p>{text}</p>
			<div className="flex">
				{tags.map((tag) => (
					<Tag key={tag} tag={tag} />
				))}
			</div>
		</div>
	);
}

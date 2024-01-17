import Image from 'next/image';
import CloseIcon from '../../public/close.svg';

export type TagType =
	| 'Event'
	| 'Conversation'
	| 'Feeling'
	| 'Realization'
	| 'Observation';

type TagProps = {
	tag: TagType;
	removeTag?: (tag: TagType) => void;
};

export default function Tag({ tag, removeTag }: TagProps) {
	return (
		<li className="w-fit flex items-center border-solid border-2 bg-[#F9F9F9] rounded-full px-3 py-1 text-xs mr-2 mb-2 font-sans">
			<p>#{tag}</p>
			{removeTag && (
				<button type="button" onClick={() => removeTag(tag)}>
					<Image src={CloseIcon} alt="Close icon" width={14} className="ml-2" />
				</button>
			)}
		</li>
	);
}

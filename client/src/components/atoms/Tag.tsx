import Image from 'next/image';
import { TagProps } from '@/types/tags';
import CloseIcon from '../../public/close.svg';

export default function Tag({ tag, removeTag }: TagProps) {
	return (
		<li className="w-fit flex items-center border-solid border-2 bg-[#F9F9F9] rounded-full px-3 py-1 text-xs mr-2">
			<p className="mr-2">#{tag.name}</p>
			{removeTag && (
				<button
					type="button"
					aria-label={`Remove tag ${tag.name}`}
					onClick={() => removeTag(tag)}
				>
					<Image src={CloseIcon} alt="" width={14} />
				</button>
			)}
		</li>
	);
}

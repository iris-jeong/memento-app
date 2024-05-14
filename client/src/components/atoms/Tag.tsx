import Image from 'next/image';
import { TagProps } from '@/types/tags';
import CloseIcon from '../../../public/close.svg';
import { useSmallTagIcons } from '@/hooks/useTagIcons';

export default function Tag({ tag, removeTag }: TagProps) {
	const tagIcon = useSmallTagIcons(tag.name);

	return (
		<li className="w-fit flex items-center border-solid border-2 bg-[#F9F9F9] rounded-full px-2 py-1 mr-2">
			<Image src={tagIcon} alt="" width={15} className="mr-1" />
			<p className="text-[11px] xxs:text-xs">{tag.name}</p>

			{removeTag && (
				<button
					type="button"
					aria-label={`Remove tag ${tag.name}`}
					onClick={() => removeTag(tag)}
					className="ml-2"
				>
					<Image src={CloseIcon} alt="" width={14} />
				</button>
			)}
		</li>
	);
}

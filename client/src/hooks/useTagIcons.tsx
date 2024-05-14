import { StaticImageData } from 'next/image';
import PinkTag from '../../public/tag-pink.svg';
import YellowTag from '../../public/tag-yellow.svg';
import PurpleTag from '../../public/tag-purple.svg';
import BlueTag from '../../public/tag-blue.svg';
import GreenTag from '../../public/tag-green.svg';
import PinkTagSm from '../../public/tag-pink-sm.svg';
import YellowTagSm from '../../public/tag-yellow-sm.svg';
import PurpleTagSm from '../../public/tag-purple-sm.svg';
import BlueTagSm from '../../public/tag-blue-sm.svg';
import GreenTagSm from '../../public/tag-green-sm.svg';

const tagIconsMap: Record<string, StaticImageData> = {
	Conversation: PinkTag,
	Event: YellowTag,
	Feeling: PurpleTag,
	Observation: BlueTag,
	Realization: GreenTag,
};

const smallTagIconsMap: Record<string, StaticImageData> = {
	Conversation: PinkTagSm,
	Event: YellowTagSm,
	Feeling: PurpleTagSm,
	Observation: BlueTagSm,
	Realization: GreenTagSm,
};

export default function useTagIcons(tagName: string) {
	return tagIconsMap[tagName] || null;
}

export function useSmallTagIcons(tagName: string) {
	return smallTagIconsMap[tagName] || null;
}

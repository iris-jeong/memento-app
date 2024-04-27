import { TagType } from '@/types/tags';

export interface TagFilterProps {
	selectedTags: TagType[];
	setSelectedTags: React.Dispatch<React.SetStateAction<TagType[]>>;
}

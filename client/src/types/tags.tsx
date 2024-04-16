import { TagType } from '@/components/Tag';

export interface TagSelector {
	selectedTags: TagType[];
	setSelectedTags: React.Dispatch<React.SetStateAction<TagType[]>>;
}

export interface TagOptionsProps {
	tagOptionsRef: React.RefObject<HTMLDivElement>;
	selectedTags: TagType[];
	setSelectedTags: React.Dispatch<React.SetStateAction<TagType[]>>;
	position: string;
}

export interface GetTagsResponse {}

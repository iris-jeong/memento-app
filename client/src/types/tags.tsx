export interface TagType {
	_id: string;
	name: string;
	isPredefined: boolean;
}
export interface TagProps {
	tag: TagType;
	removeTag?: (tag: TagType) => void;
}

export interface TagSelector {
	selectedTags: TagType[];
	setSelectedTags: React.Dispatch<React.SetStateAction<TagType[]>>;
}

export interface TagOptionsProps {
	tagOptionsRef: React.RefObject<HTMLDivElement>;
	selectedTags: TagType[];
	setSelectedTags: React.Dispatch<React.SetStateAction<TagType[]>>;
	position?: string;
}

export interface GetTagsResponse {}

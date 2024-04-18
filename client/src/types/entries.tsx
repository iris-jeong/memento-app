import { TagType } from '@/types/tags';

export interface EntryType {
	id: string;
	userId?: string;
	content: string;
	date: Date;
	tags: TagType[];
}

export interface EntryProps {
	date: Date;
	content: string;
	tags?: TagType[];
	handleEntryClick: () => void;
}

export interface CreateEntryResponse {
	entry: EntryType;
	location: string;
	success: boolean;
}

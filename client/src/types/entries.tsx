import { TagType } from '@/components/Tag';

export interface Entry {
	id: string;
	userId?: string;
	content: string;
	date: Date;
	tags: TagType[];
}

export interface CreateEntryResponse {
	entry: Entry;
	location: string;
	success: boolean;
}

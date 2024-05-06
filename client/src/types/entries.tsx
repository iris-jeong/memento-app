import { TagType } from '@/types/tags';

export interface EntryType {
	_id: string;
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
	classNames: string;
}

export interface AllEntriesProps {
	entries: EntryType[];
	setEntries: React.Dispatch<React.SetStateAction<EntryType[]>>;
	highlightedEntryId: string | null;
}

export interface EntryListProps {
	entries: EntryType[];
	filteredEntries: EntryType[];
	onClick: (entry: EntryType) => void;
	highlightedEntryId: string | null;
}
export interface CreateEntryResponse {
	entry: EntryType;
	location: string;
	success: boolean;
}

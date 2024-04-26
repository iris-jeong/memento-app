import { EntryType } from '@/types/entries';

export interface ModalProps {
	entry: EntryType;
	closeModal: () => void;
	setEntries: React.Dispatch<React.SetStateAction<EntryType[]>>;
}

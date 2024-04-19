import { EntryType } from '@/types/entries';

export interface ModalProps {
	entry: EntryType | null;
	closeModal: () => void;
}

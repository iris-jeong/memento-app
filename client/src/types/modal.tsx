import { EntryType } from '@/types/entries';

export interface ModalProps {
	entry: EntryType;
	closeModal: () => void;
}

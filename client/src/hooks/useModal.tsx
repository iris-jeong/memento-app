import { useState, useCallback } from 'react';
import { EntryType } from '@/types/entries';

export function useModal() {
	const initialValue = {
		id: '',
		userId: '',
		content: '',
		date: new Date(),
		tags: [],
	};
	const [isOpen, setIsOpen] = useState(false);
	const [currentEntry, setCurrentEntry] = useState<EntryType>(initialValue);

	const openModal = useCallback((entry: EntryType) => {
		setCurrentEntry(entry);
		setIsOpen(true);
	}, []);
	const closeModal = useCallback(() => {
		setCurrentEntry(initialValue);
		setIsOpen(false);
	}, [initialValue]);

	return { isOpen, currentEntry, openModal, closeModal };
}

import { EntryType } from '@/types/entries';
import { useState, useCallback } from 'react';

export function useModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [currentEntry, setCurrentEntry] = useState<EntryType | null>(null);

	const openModal = useCallback((entry: EntryType) => {
		setCurrentEntry(entry);
		setIsOpen(true);
	}, []);
	const closeModal = useCallback(() => {
		setCurrentEntry(null);
		setIsOpen(false);
	}, []);

	return { isOpen, currentEntry, openModal, closeModal };
}

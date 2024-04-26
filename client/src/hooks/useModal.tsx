import { useState, useCallback } from 'react';
import { EntryType } from '@/types/entries';

const initialValue = {
	_id: '',
	userId: '',
	content: '',
	date: new Date(),
	tags: [],
};

export function useModal() {
	const [isOpen, setIsOpen] = useState(false);
	const [currentEntry, setCurrentEntry] = useState<EntryType>(initialValue);

	const openModal = useCallback((entry: EntryType) => {
		setCurrentEntry(entry);
		setIsOpen(true);
	}, []);

	const closeModal = useCallback(() => {
		setCurrentEntry(initialValue);
		setIsOpen(false);
	}, []);

	return { isOpen, currentEntry, openModal, closeModal };
}

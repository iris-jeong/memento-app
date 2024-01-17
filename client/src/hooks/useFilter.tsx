import { useState } from 'react';

export default function useFilter<T>(initialState: T[]) {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [selectedFilters, setSelectedFilters] = useState<T[]>(initialState);

	const toggleFilter = () => {
		setIsOpen((prevIsOpen) => !prevIsOpen);
	};

	const closeFilter = () => {
		setIsOpen(false);
	};

	const handleFilterChange = (filters: T[] | ((prevTags: T[]) => T[])) => {
		if (typeof filters === 'function') {
			setSelectedFilters((prevSelectedFilters) => filters(prevSelectedFilters));
		} else {
			setSelectedFilters(filters);
		}
	};

	return {
		isOpen,
		toggleFilter,
		selectedFilters,
		setSelectedFilters,
		handleFilterChange,
		closeFilter,
	};
}

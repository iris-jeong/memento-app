import { trapFocus } from '@/utils/trapFocus';
import { RefObject, useEffect } from 'react';

export default function useTrapFocus(
	isMenuOpen: boolean,
	menuRef: RefObject<HTMLDivElement>
) {
	useEffect(() => {
		if (!isMenuOpen) {
			return;
		}

		const menuElement = menuRef.current;
		const focusableElements = menuElement?.querySelectorAll(
			'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
		) as NodeListOf<HTMLElement>;

		if (focusableElements.length === 0) return;

		const firstElement = focusableElements[0];
		const lastElement = focusableElements[focusableElements.length - 1];
		const handleTrapFocus = trapFocus(firstElement, lastElement);

		menuElement?.addEventListener('keydown', handleTrapFocus);
		firstElement.focus();

		return () => menuElement?.removeEventListener('keydown', handleTrapFocus);
	}, [isMenuOpen, menuRef]);
}

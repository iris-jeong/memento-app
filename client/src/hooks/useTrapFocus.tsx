import { trapFocus } from '@/utils/trapFocus';
import { RefObject, useEffect, useRef } from 'react';

export default function useTrapFocus(
	isMenuOpen: boolean,
	menuRef: RefObject<HTMLDivElement>
) {
	const observerRef = useRef<MutationObserver | null>(null);

	useEffect(() => {
		if (!isMenuOpen || !menuRef.current) return;

		const menuElement = menuRef.current;

		// Setup a function to update the focus trap.
		const updateFocusTrap = () => {
			const focusableElements = menuElement?.querySelectorAll(
				'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"]), li[tabindex]'
			) as NodeListOf<HTMLElement>;

			if (focusableElements.length > 0) {
				const firstElement = focusableElements[0];
				const lastElement = focusableElements[focusableElements.length - 1];

				const handleTrapFocus = trapFocus(firstElement, lastElement);
				menuElement.addEventListener('keydown', handleTrapFocus);
				firstElement.focus();

				// Clean up old listeners if observer is re-triggered.
				return () => {
					menuElement?.removeEventListener('keydown', handleTrapFocus);
				};
			}
		};

		let cleanupFocusTrap = updateFocusTrap(); // Initalize focus trap.

		// Observe the DOM for changes.
		observerRef.current = new MutationObserver((mutations) => {
			for (let mutation of mutations) {
				if (mutation.type === 'childList' || mutation.type === 'attributes') {
					cleanupFocusTrap?.(); // Clean up any existing focus trap setup before setting up a new one.
					cleanupFocusTrap = updateFocusTrap(); // Set up a new focus trap if needed.
				}
			}
		});

		observerRef.current.observe(menuElement, {
			childList: true,
			subtree: true,
			attributes: true,
			attributeFilter: ['tabindex', 'disabled'], // Filter to observe changes to tabindex if relevant.
		});

		return () => {
			observerRef.current?.disconnect(); // Stop observing when the component is unmounted or conditions change.
			cleanupFocusTrap?.(); // Clean up focus trap.
		};
	}, [isMenuOpen, menuRef]);
}

export const trapFocus =
	(firstElement: HTMLElement, lastElement: HTMLElement) =>
	(event: KeyboardEvent) => {
		if (event.key === 'Tab') {
			if (event.shiftKey && document.activeElement === firstElement) {
				lastElement.focus();
				event.preventDefault();
			} else if (!event.shiftKey && document.activeElement === lastElement) {
				firstElement.focus();
				event.preventDefault();
			}
		}
	};

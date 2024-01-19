import { useEffect, RefObject, useState } from 'react';

export default function useMultilineEllipsis(
	ref: RefObject<HTMLElement>,
	text: string,
	maxHeight: number
): string {
	const [truncatedText, setTruncatedText] = useState(text);

	useEffect(() => {
		const element = ref.current;
		if (!element) return;

		// Watches for size changes of the element
		const resizeObserver = new ResizeObserver(() => {
			let newText = text;
			element.innerText = newText;

			while (element.scrollHeight > maxHeight && newText.length > 0) {
				newText = newText.slice(0, -1);
				element.innerText = newText + '...';
			}
			setTruncatedText(newText + (newText.length < text.length ? '...' : ''));
		});

		resizeObserver.observe(element);

		return () => {
			resizeObserver.disconnect();
		};
	}, [text, maxHeight, ref]);

	return truncatedText;
}

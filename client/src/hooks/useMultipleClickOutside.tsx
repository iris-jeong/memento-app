import { RefObject, useEffect } from 'react';

type ClickOutsideHandler = () => void;

interface ClickOutsideConfig {
	ref: RefObject<HTMLElement>;
	handler: ClickOutsideHandler;
}

const useMultipleClickOutside = (configs: ClickOutsideConfig[]): void => {
	useEffect(() => {
		const listener = (event: MouseEvent | TouchEvent) => {
			configs.forEach(({ ref, handler }) => {
				if (!ref.current || ref.current.contains(event.target as Node)) {
					return;
				}
				handler();
			});
		};

		document.addEventListener('mousedown', listener);
		document.addEventListener('touchstart', listener);

		return () => {
			document.removeEventListener('mousedown', listener);
			document.removeEventListener('touchstart', listener);
		};
	}, [configs]);
};

export default useMultipleClickOutside;

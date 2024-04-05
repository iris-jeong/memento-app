import { StaticImageData } from 'next/image';
import { RefObject } from 'react';

export interface NavLinksProps {
	isMobile: boolean;
}

export interface NavLink {
	href: string;
	label: string;
}

export interface MobileNavProps {
	menuRef: RefObject<HTMLDivElement>;
	isMenuOpen: boolean;
	onClick: () => void;
}

export interface IconButtonProps {
	icon: StaticImageData;
	alt: string;
	onClick: () => void;
	width?: number;
	height?: number;
}

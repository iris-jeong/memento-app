import { StaticImageData } from 'next/image';

export interface NavLinksProps {
	links: NavLink[];
	isMobile: boolean;
}

export interface NavLink {
	href: string;
	label: string;
	onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
}

export interface IconButtonProps {
	icon: StaticImageData;
	alt: string;
	onClick: () => void;
	width?: number;
	height?: number;
}

export interface DesktopNavProps {
	links: NavLink[];
}

export interface MobileNavProps {
	links: NavLink[];
}

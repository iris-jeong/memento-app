import { StaticImageData } from 'next/image';

export interface ButtonProps {
	children: React.ReactNode;
	type?: 'button' | 'submit';
	variant?: 'primary' | 'secondary';
	className?: string;
	href?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	disabled?: boolean;
}

export interface IconButtonProps {
	icon: StaticImageData;
	hoverIcon: StaticImageData;
	activeIcon?: StaticImageData;
	alt: string;
	onClick: () => void;
	classes?: string;
	width?: number;
	height?: number;
}

export interface ButtonProps {
	children: React.ReactNode;
	type?: 'button' | 'submit';
	variant?: 'primary' | 'secondary';
	className?: string;
	href?: string;
	onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	disabled?: boolean;
}

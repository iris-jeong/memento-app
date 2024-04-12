import { ButtonProps } from '@/types/button';

export default function Button({
	children,
	type = 'button',
	variant = 'primary',
	className = '',
	href,
	onClick,
	disabled = false,
}: ButtonProps) {
	const baseStyles =
		'px-8 py-4 bg-[#1945E2] hover:bg-[#0B3AE1] text-lg text-white font-semibold shadow-xl';
	const variantStyles = {
		primary: 'rounded-full mt-8',
		secondary: 'rounded w-full',
	};
	const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

	if (href) {
		return (
			<a href={href} className={styles}>
				{children}
			</a>
		);
	}

	return (
		<button
			type={type}
			className={styles}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

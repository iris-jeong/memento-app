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
		'px-10 py-5 bg-[#1945E2] hover:bg-[#0B3AE1] text-lg text-white font-semibold shadow-xl';
	const variantStyles = {
		primary: 'rounded-full mt-8 w-fit mx-auto',
		secondary: 'rounded w-full',
	};
	const disabledStyles = {
		disabled: 'opacity-50 cursor-default hover:bg-[#1945E2]',
		enabled: 'cursor-pointer',
	};
	const styles = `${baseStyles} ${variantStyles[variant]} ${
		disabled ? disabledStyles['disabled'] : disabledStyles['enabled']
	} ${className}`;

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

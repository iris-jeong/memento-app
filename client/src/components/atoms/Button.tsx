import { ButtonProps } from '@/types/button';

export default function Button({
	label,
	href,
	className,
	onClick,
}: ButtonProps) {
	const baseClass =
		'inline-block px-6 py-4 rounded-full text-white font-semibold bg-[#1945E2] hover:bg-[#0B3AE1] shadow-lg';

	if (href) {
		return (
			<a href={href} className={`${baseClass} ${className}`}>
				{label}
			</a>
		);
	}

	return (
		<button className={`${baseClass} ${className}`} onClick={onClick}>
			{label}
		</button>
	);
}

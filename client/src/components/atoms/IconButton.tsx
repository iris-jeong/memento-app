import Image from 'next/image';
import { IconButtonProps } from '@/types/navigation';

export default function IconButton({
	icon,
	alt,
	onClick,
	width,
	height,
}: IconButtonProps) {
	return (
		<button
			type="button"
			className="relative z-50"
			aria-label={alt}
			onClick={onClick}
		>
			<Image src={icon} alt={alt} width={width} height={height} />
		</button>
	);
}

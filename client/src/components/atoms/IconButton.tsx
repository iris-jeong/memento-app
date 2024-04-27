import { useState } from 'react';
import Image from 'next/image';
import { IconButtonProps } from '@/types/button';

export default function IconButton({
	icon,
	hoverIcon,
	activeIcon,
	alt,
	onClick,
	classes,
	width,
	height,
}: IconButtonProps) {
	const [isHovered, setIsHovered] = useState(false);
	const [isActive, setIsActive] = useState(false);
	const iconSrc = isActive ? activeIcon || icon : isHovered ? hoverIcon : icon;

	return (
		<button
			type="button"
			className={classes}
			aria-label={alt}
			onClick={() => {
				setIsActive((prevIsActive) => !prevIsActive);
				onClick();
			}}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Image src={iconSrc} alt={alt} width={width} height={height} />
		</button>
	);
}

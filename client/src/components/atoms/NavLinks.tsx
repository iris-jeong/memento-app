import { NavLinksProps } from '@/types/navigation';

export default function NavLinks({ links, isMobile = false }: NavLinksProps) {
	const defaultUlClasses = `h-full flex font-semibold ${
		isMobile ? 'flex-col justify-center items-center text-2xl' : 'sm:flex-row'
	}`;
	const defaultLiClasses = `w-full text-center ${isMobile ? 'mb-6' : 'ml-8'}`;

	return (
		<ul className={defaultUlClasses}>
			{links.map((link) => (
				<li key={link.label} className={defaultLiClasses}>
					<a
						href={link.href}
						onClick={link.onClick}
						className={`hover:text-[#1945E2] ${
							isMobile ? 'block px-16 py-5' : 'text-nowrap'
						}`}
					>
						{link.label}
					</a>
				</li>
			))}
		</ul>
	);
}

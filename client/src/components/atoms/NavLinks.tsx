import { NavLinksProps, NavLink } from '@/types/navigation';

const navLinks: NavLink[] = [
	{ href: '/login', label: 'Log In' },
	{ href: '/register', label: 'Sign Up' },
];

export default function NavLinks({ isMobile = false }: NavLinksProps) {
	const defaultUlClasses = `flex ${
		isMobile ? 'flex-col justify-end text-end' : 'sm:flex-row'
	}`;
	const defaultLiClasses = `hover:text-[#242424] ${isMobile ? 'mb-8' : 'ml-8'}`;

	return (
		<ul className={defaultUlClasses}>
			{navLinks.map((link) => (
				<li key={link.label} className={defaultLiClasses}>
					<a href={link.href}>{link.label}</a>
				</li>
			))}
		</ul>
	);
}

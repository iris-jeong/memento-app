import { NavLinksProps, NavLink } from '@/types/navigation';

const navLinks: NavLink[] = [
	{ href: '#', label: 'About' },
	{ href: '/login', label: 'Log In' },
	{ href: '/register', label: 'Sign Up' },
];

export default function NavLinks({ isMobile = false }: NavLinksProps) {
	const defaultUlClasses = `flex font-semibold ${
		isMobile ? 'flex-col items-center text-xl' : 'sm:flex-row'
	}`;
	const defaultLiClasses = `hover:text-[#1945E2] ${
		isMobile ? 'mb-12' : 'ml-8'
	}`;

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

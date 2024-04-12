import DesktopNav from '@/components/molecules/DesktopNav';
import MobileNav from '@/components/molecules/MobileNav';
import { MouseEvent } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { NavLink } from '@/types/navigation';
import Image from 'next/image';
import WaveIcon from '../../../public/wave.svg';

const landingPageLinks: NavLink[] = [
	{ href: '#', label: 'About' },
	{ href: '/login', label: 'Log In' },
	{ href: '/register', label: 'Sign Up' },
];

export default function Header() {
	const { user, isAuthenticated, logout } = useAuth();
	const router = useRouter();

	const handleLogout = (e: MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault();
		logout();
		router.push('/');
	};

	const homePageLinks: NavLink[] = [
		{ href: '/', label: 'Log Out', onClick: handleLogout },
	];

	const links = isAuthenticated ? homePageLinks : landingPageLinks;

	// Determine if the current page is the login or sign up page
	const pathname = usePathname();
	const isLoginPage = pathname === '/login';
	const isSignUpPage = pathname === '/register';
	const shouldHideNav = isLoginPage || isSignUpPage;

	return (
		<header className="h-[110px] flex justify-between items-center px-6 py-4 xs:py-8 sm:px-12">
			<div className="flex items-center">
				{isAuthenticated ? (
					<>
						<Image src={WaveIcon} alt="" aria-hidden="true" width={22} />
						<p className="ml-2 text-lg font-sourceSerif">
							Welcome, {user?.firstName || 'user'}!
						</p>
					</>
				) : (
					<a href="/" className="font-sourceSerif font-bold text-lg">
						Memento
					</a>
				)}
			</div>

			{!shouldHideNav && (
				<>
					<DesktopNav links={links} />
					<MobileNav links={links} />
				</>
			)}
		</header>
	);
}

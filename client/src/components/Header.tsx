'use client';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import WaveIcon from '../../public/wave.svg';
import MenuIcon from '../../public/menu.svg';
import LogOutIcon from '../../public/logout.svg';
import useClickOutside from '@/hooks/useClickOutside';
import { useAuth } from '@/hooks/useAuth';

const Header: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const navRef = useRef<HTMLDivElement>(null);
	const { user, isAuthenticated, logout } = useAuth();
	const router = useRouter();

	useClickOutside(navRef, () => {
		setIsOpen(false);
	});

	const toggleMenu = (): void => setIsOpen((prevIsOpen) => !prevIsOpen);

	const handleLogout = () => {
		logout();
		router.push('/');
	};

	return (
		<header className="flex justify-between items-center p-6">
			<div className="flex">
				<Image src={WaveIcon} alt="Hand wave icon" width={22} />
				{isAuthenticated && (
					<p className="ml-2 font-medium sm:text-lg md:text-xl">{`Welcome, ${user?.firstName}!`}</p>
				)}
			</div>
			<nav ref={navRef} className="relative flex justify-end" role="navigation">
				<button
					onClick={toggleMenu}
					aria-expanded={isOpen}
					aria-label="Toggle menu"
				>
					<Image
						src={MenuIcon}
						alt="Hamburger menu icon"
						width={28}
						height={28}
						priority
					/>
				</button>

				{isOpen && (
					<ul className="absolute top-8 w-40 border-solid border-2 rounded py-4 pr-4 flex justify-end bg-slate-50">
						<li className="flex cursor-pointer" onClick={handleLogout}>
							<Image src={LogOutIcon} alt="Log out icon" width={24} />
							<p className="pl-2">Log Out</p>
						</li>
					</ul>
				)}
			</nav>
		</header>
	);
};

export default Header;

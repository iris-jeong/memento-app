'use client';
import Image from 'next/image';
import WaveIcon from '../../public/wave.svg';
import MenuIcon from '../../public/menu.svg';
import LogOutIcon from '../../public/logout.svg';
import { useState, useRef, useEffect } from 'react';

const Header: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const navRef = useRef<HTMLDivElement>(null);

	const toggleMenu = (): void => setIsOpen((prevIsOpen) => !prevIsOpen);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent): void {
			if (navRef.current && !navRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		// Bind the event listener
		document.addEventListener('mousedown', handleClickOutside);
		return (): void => {
			// Unbind the event listener on clean up
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [navRef]);
	return (
		<header className="flex justify-between items-center p-6 lg:px-12">
			<div className="flex">
				<Image src={WaveIcon} alt="Hand wave icon" width={22} height={22} />
				<p className="ml-2 font-medium">Welcome, Iris!</p>
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
					/>
				</button>

				{isOpen && (
					<ul className="absolute top-8 w-40 border-solid border-2 rounded py-4 pr-4 flex justify-end bg-slate-50">
						<li>
							<a className="flex" href="#">
								<Image src={LogOutIcon} alt="Log out icon" width={24} />
								<p className="pl-2">Log Out</p>
							</a>
						</li>
					</ul>
				)}
			</nav>
		</header>
	);
};

export default Header;

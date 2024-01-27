'use client';
import Image from 'next/image';
import Journal from '../../public/journaling.svg';
import Menu from '../../public/menu.svg';
import Close from '../../public/close-black.svg';
import { useRef, useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

export default function Landing() {
	const menuRef = useRef<HTMLDivElement>(null);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const toggleMenu = (): void => {
		setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
	};

	useClickOutside(menuRef, () => setIsMenuOpen(false));

	return (
		<div className="flex flex-col h-screen">
			<header className="flex justify-between items-center p-4 sm:px-12 sm:py-8">
				<a href="" className="mr-4 font-bold text-lg">
					Memento
					<span className="ml-2 text-base font-thin">
						- * Under Construction *
					</span>
				</a>

				<nav className="font-semibold text-md hidden sm:block">
					<ul className="flex">
						<li>
							<a href="#">About</a>
						</li>
						<li className="ml-8">
							<a href="#">Sign In</a>
						</li>
						<li className="ml-8">
							<a href="/register">Sign Up</a>
						</li>
					</ul>
				</nav>

				<div
					ref={menuRef}
					className="mobile-nav sm:hidden flex flex-col items-end"
				>
					{!isMenuOpen && (
						<button type="button" onClick={toggleMenu}>
							<Image src={Menu} alt="Hamburger menu" width={32} />
						</button>
					)}

					{isMenuOpen && (
						<aside className="relative flex flex-col items-end">
							<button type="button" onClick={toggleMenu}>
								<Image src={Close} alt="Close icon" width={32} />
							</button>

							<nav className="border-2 rounded-lg font-semibold text-xl w-48 absolute top-10 py-4 pr-4 bg-white">
								<ul className="flex flex-col justify-end text-end">
									<li className="mb-8 hover:text-[#242424]">
										<a href="#">About</a>
									</li>
									<li className="mb-8 hover:text-[#242424]">
										<a href="#">Log In</a>
									</li>
									<li className="hover:text-[#242424]">
										<a href="#">Sign Up</a>
									</li>
								</ul>
							</nav>
						</aside>
					)}
				</div>
			</header>

			<main className="flex flex-grow justify-center items-center">
				<div className="flex flex-col items-center h-fit px-6">
					<Image src={Journal} alt="Journal" width={400} />
					<div className="mb-8 text-center">
						<h1 className="font-bold text-4xl xs:text-5xl text-[#2A2A2A] mb-4">
							Homework for Life
						</h1>
						<h2>Notice the meaningful moments in everyday life.</h2>
					</div>
					<a
						href="#"
						className="border-2 px-6 py-4 rounded-full text-white bg-[#2A2A2A] hover:bg-[#242424] shadow-lg"
					>
						Get Started
					</a>
				</div>
			</main>
		</div>
	);
}

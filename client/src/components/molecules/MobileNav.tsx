import { useRef, useState } from 'react';
import IconButton from '../atoms/IconButton';
import Menu from '../../../public/menu.svg';
import Close from '../../../public/close-black.svg';
import NavLinks from '../atoms/NavLinks';
import useClickOutside from '@/hooks/useClickOutside';
import useTrapFocus from '@/hooks/useTrapFocus';
import { MobileNavProps } from '@/types/navigation';

export default function MobileNav({ links }: MobileNavProps) {
	const menuRef = useRef<HTMLDivElement>(null);
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

	const toggleMenu = (): void => {
		setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
	};

	useClickOutside(menuRef, () => setIsMenuOpen(false));
	useTrapFocus(isMenuOpen, menuRef);

	return (
		<>
			{isMenuOpen && (
				<div className="fixed inset-0 z-30 bg-slate-300 bg-opacity-25 backdrop-blur-md"></div>
			)}
			<div ref={menuRef} className="sm:hidden relative">
				<IconButton
					icon={isMenuOpen ? Close : Menu}
					alt="Menu"
					onClick={toggleMenu}
					width={32}
				/>

				<aside
					aria-hidden={!isMenuOpen}
					className="absolute top-0 right-0 z-40"
				>
					<nav
						className={`fixed top-0 right-0 bottom-0 h-screen min-w-[75vw] max-w-sm bg-[#efefef] py-[80px] px-[10px] shadow-[-10px_0px_30px_-15px_rgba(0,0,0,0.3)] transition-transform duration-300 ease-in-out ${
							isMenuOpen ? 'translate-x-0' : 'translate-x-full'
						}`}
					>
						<NavLinks links={links} isMobile={true} />
					</nav>
				</aside>
			</div>
		</>
	);
}

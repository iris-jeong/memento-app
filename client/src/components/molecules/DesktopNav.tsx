import NavLinks from '../atoms/NavLinks';
import { DesktopNavProps } from '@/types/navigation';

export default function DesktopNav({ links }: DesktopNavProps) {
	return (
		<nav className="hidden sm:block">
			<NavLinks links={links} isMobile={false} />
		</nav>
	);
}

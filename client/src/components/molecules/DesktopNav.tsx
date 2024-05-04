import { DesktopNavProps } from '@/types/navigation';
import NavLinks from '@/components/atoms/NavLinks';

export default function DesktopNav({ links }: DesktopNavProps) {
	return (
		<nav className="hidden sm:block">
			<NavLinks links={links} isMobile={false} />
		</nav>
	);
}

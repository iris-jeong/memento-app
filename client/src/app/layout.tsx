import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';

export const metadata: Metadata = {
	title: 'Memento',
	description:
		"Rediscover the joy in everyday moments with our app. Reflect, record, and relive the day's most memorable experiences. Perfect for fostering mindfulness and gratitude.",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<AuthProvider>{children}</AuthProvider>
			</body>
		</html>
	);
}

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export const useAuthRedirect = (redirectTo: string) => {
	const { token } = useAuth();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [isRedirecting, setIsRedirecting] = useState<boolean>(false);

	useEffect(() => {
		if (typeof token === 'undefined') {
			// Token status hasn't been determined yet, so stay in loading state.
			return;
		}

		if (token) {
			// If authenticated, set redirecting state and navigate.
			setIsRedirecting(true);
			router.replace(redirectTo);
		} else {
			// If not authenticated, stop loading.
			setIsLoading(false);
		}
	}, [token, router, redirectTo]);

	return { isLoading, isRedirecting };
};

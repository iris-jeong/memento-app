'use client';
import { createContext, useState, PropsWithChildren, useEffect } from 'react';
import { User, AuthState, AuthContextType } from '@/types/auth';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	user: null,
	token: '',
	login: () => {},
	logout: () => {},
});

const isTokenExpired = (token: string): boolean => {
	try {
		const decodedToken: any = jwtDecode(token);
		const currentTime = Date.now() / 1000;
		return decodedToken.exp < currentTime;
	} catch (error) {
		console.error('Error decoding token', error);
		return true;
	}
};

const intervalDuration = 24 * 60 * 60 * 1000; // 24 hours

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [authState, setAuthState] = useState<AuthState>({
		isAuthenticated: false,
		user: null,
		token: '',
	});

	useEffect(() => {
		// Polling to check token expiration periodically.
		const interval = setInterval(() => {
			const token = localStorage.getItem('token');
			if (token && isTokenExpired(token)) {
				console.error('Token expired, logging out');
				logout();
			}
		}, intervalDuration);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		// Rehydrate state from local storage.
		const token = localStorage.getItem('token');
		const userData = localStorage.getItem('user');
		if (token && userData && !isTokenExpired(token)) {
			setAuthState({
				isAuthenticated: true,
				user: JSON.parse(userData),
				token: token,
			});
		} else {
			console.error('Token expired, logging out');
			logout();
		}
	}, []);

	const login = (token: string, user: User) => {
		localStorage.setItem('token', token);
		localStorage.setItem('user', JSON.stringify(user));
		setAuthState({ isAuthenticated: true, user, token });
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setAuthState({ isAuthenticated: false, user: null, token: '' });
	};

	return (
		<AuthContext.Provider value={{ ...authState, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

'use client';
import { createContext, useState, PropsWithChildren, useEffect } from 'react';
import { User, AuthState, AuthContextType } from '@/types/auth';

export const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	user: null,
	token: '',
	login: () => {},
	logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [authState, setAuthState] = useState<AuthState>({
		isAuthenticated: false,
		user: null,
		token: '',
	});

	useEffect(() => {
		// Rehydrate state from local storage
		const token = localStorage.getItem('token');
		const userData = localStorage.getItem('user');
		if (token && userData) {
			setAuthState({
				isAuthenticated: true,
				user: JSON.parse(userData),
				token: token,
			});
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

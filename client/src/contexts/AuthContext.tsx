'use client';
import { createContext, useState, PropsWithChildren, useEffect } from 'react';

interface User {
	firstName: string;
	lastName: string;
	email: string;
}

interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
}

export type AuthContextType = {
	isAuthenticated: boolean;
	user: User | null;
	login: (token: string, user: User) => void;
	logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
	isAuthenticated: false,
	user: null,
	login: () => {},
	logout: () => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [authState, setAuthState] = useState<AuthState>({
		isAuthenticated: false,
		user: null,
	});

	useEffect(() => {
		// Rehydrate state from local storage
		const token = localStorage.getItem('token');
		const userData = localStorage.getItem('user');
		if (token && userData) {
			setAuthState({ isAuthenticated: true, user: JSON.parse(userData) });
		}
	}, []);

	const login = (token: string, user: User) => {
		localStorage.setItem('token', token);
		localStorage.setItem('user', JSON.stringify(user));
		setAuthState({ isAuthenticated: true, user });
	};

	const logout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		setAuthState({ isAuthenticated: false, user: null });
	};

	return (
		<AuthContext.Provider value={{ ...authState, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

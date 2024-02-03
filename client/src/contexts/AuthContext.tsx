'use client';
import { createContext, useState, PropsWithChildren } from 'react';

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

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [authState, setAuthState] = useState<AuthState>({
		isAuthenticated: false,
		user: null,
	});

	const login = (token: string, user: User) => {
		localStorage.setItem('token', token);
		setAuthState({ isAuthenticated: true, user });
	};

	const logout = () => {
		localStorage.removeItem('token');
		setAuthState({ isAuthenticated: false, user: null });
	};

	return (
		<AuthContext.Provider value={{ ...authState, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

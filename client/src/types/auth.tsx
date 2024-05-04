export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}
export interface AuthState {
	isAuthenticated: boolean;
	user: User | null;
	token: string;
}

export type AuthContextType = {
	isAuthenticated: boolean;
	user: User | null;
	token: string;
	login: (token: string, user: User) => void;
	logout: () => void;
};

export interface Response {
	token: string;
	user: User;
}

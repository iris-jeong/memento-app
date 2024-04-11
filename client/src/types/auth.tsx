export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}

export interface RegisterResponse {
	token: string;
	user: User;
}

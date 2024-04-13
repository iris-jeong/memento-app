export interface User {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
}

export interface Response {
	token: string;
	user: User;
}

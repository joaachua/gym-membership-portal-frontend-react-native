// types/auth.d.ts
export interface User {
	id: number;
	email: string;
	full_name: string;
	is_verified: boolean;
	// Add more user fields as needed
}

export interface RegisterRequest {
	salutation: string;
	full_name: string;
	username: string;
	phone_number: string;
	email: string;
	password: string;
	platform: number;
}

export interface RegisterResponse {
	success: boolean;
	status_code: number;
	message: string;
	data: {
		user: User;
		// other user-specific data
	};
}

export interface LoginRequest {
	email: string;
	password: string;
	fcm_token?: string;
}

export interface LoginResponse {
	success: boolean;
	status_code: number;
	message: string;
	data: {
		token: string;
		user: User;
		// any other user-related data
	};
}

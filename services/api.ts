// services/api.ts
import axios from "axios";
import {
	RegisterRequest,
	RegisterResponse,
	LoginRequest,
	LoginResponse,
} from "../types/auth";
import Constants from "expo-constants"; // if using Expo

const API_URL = Constants.expoConfig?.extra?.API_URL || process.env.API_URL;

export const registerUser = async (
	data: RegisterRequest
): Promise<RegisterResponse> => {
	const response = await axios.post(`${API_URL}/user/register`, data);
	return response.data;
};

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
	const response = await axios.post(`${API_URL}/user/login`, data);
	return response.data;
};

export const calculateCalorie = async (data) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/estimate-calorie`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImFqb2FubmFjaHVhQGdtYWlsLmNvbSIsInNpZ25lZEF0IjoiMjAyNS0wNS0xMFQwNTo1NzozNC4yMzVaIiwiaWF0IjoxNzQ2ODU2NjU0LCJleHAiOjE3NDY5NDMwNTR9.wxKIKjEvugnZuspUr59sJWhDG09OY0M4-yGKJeSHsyU"
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error calculating calories:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const logWorkout = async (data) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/workout-log`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6ImFqb2FubmFjaHVhQGdtYWlsLmNvbSIsInNpZ25lZEF0IjoiMjAyNS0wNS0xMFQwNTo1NzozNC4yMzVaIiwiaWF0IjoxNzQ2ODU2NjU0LCJleHAiOjE3NDY5NDMwNTR9.wxKIKjEvugnZuspUr59sJWhDG09OY0M4-yGKJeSHsyU"
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error calculating calories:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const generateWorkout = async (data) => {
	const response = await axios.post(`${API_URL}/user/recommend-workout`, data);
	return response.data;
};

// services/api.ts
import axios from "axios";
import Constants from "expo-constants"; // if using Expo

const API_URL = Constants.expoConfig?.extra?.API_URL || process.env.API_URL;

export const registerUser = async (data) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/register`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error user registartion:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const loginUser = async (data) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/login`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error user login:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const verifyOtp = async (data) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/verify-otp`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		
		return response.data;
	} catch (error) {
		console.error(
			"Error verify otp:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const forgotPassword = async (data) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/forgot-password`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		
		return response.data;
	} catch (error) {
		console.error(
			"Error triggering forgot password:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const verifyResetOtp = async (data) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/verify-reset-otp`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(
			"Error verify otp:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const resetPassword = async (data) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/reset-password`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(
			"Error reset password:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const getProfile = async (token) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/profile`,
			{},
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
			}
		);
		
		return response.data;
	} catch (error) {
		console.error(
			"Error getting user profile:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const updateProfile = async (token, data) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/profile/edit`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
			}
		);
		
		return response.data;
	} catch (error) {
		console.error(
			"Error update user profile:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const changePassword = async (token, data) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/change-password`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
			}
		);
		console.log(response.data);
		return response.data;
	} catch (error) {
		console.error(
			"Error change password:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const calculateCalorie = async (token, data) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/estimate-calorie`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
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

export const logWorkout = async (token, data) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/workout-log`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error(
			"Error logging workout:",
			error.response?.data || error.message
		);
		throw error;
	}
};

export const generateWorkout = async (token, data) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/generate-workout`,
			data,
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
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

export const logout = async (token) => {
	try {
		const response = await axios.post(
			`${API_URL}/user/logout`,
			{},
			{
				headers: {
					"Content-Type": "application/json",
					"Authorization": `Bearer ${token}`
				},
			}
		);
		
		return response.data;
	} catch (error) {
		console.error(
			"Error getting user profile:",
			error.response?.data || error.message
		);
		throw error;
	}
};
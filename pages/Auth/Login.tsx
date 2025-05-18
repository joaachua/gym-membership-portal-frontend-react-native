import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from "react-native";
import { ThemeContext, useTheme } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";
import { loginUser } from "../../services/api";
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const Login = ({ navigation, setHasAuthToken }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			const response = await loginUser({ email, password });

			if (response && response.success) {
				const { token } = response.data;

				await SecureStore.setItemAsync('auth_token', token);
				const authToken = await SecureStore.getItemAsync("auth_token");

				setHasAuthToken(true);

				Toast.show({ type: "success", text1: response?.message });
			}
		} catch (error: any) {
			const errorMessages = error.response?.data?.data;

			if (Array.isArray(errorMessages) && errorMessages.length > 0) {
				// Join all messages separated by newline or comma
				const messages = errorMessages.map((e: any) => e.message).join(", ");
				Toast.show({ type: "error", text1: messages });
			} else if (error.response?.data?.message) {
				Toast.show({ type: "error", text1: error.response.data.message });
			} else {
				Toast.show({ type: "error", text1: "Registration failed." });
			}
		}
	};

	return (
		<ImageBackground
			source={require("../../assets/img/bg-Splash-screen-v1.png")}
			style={styles.background}
			resizeMode="cover"
		>
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				{/* 🔼 Banner Image */}
				<Image
					source={require('../../assets/img/auth-img-banner.jpg')} // Replace with your banner path
					style={styles.banner}
					resizeMode="cover"
				/>

				<View style={styles.container}>
					<TextInput
						placeholder="Email"
						style={styles.input}
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
					/>
					<TextInput
						placeholder="Password"
						style={styles.input}
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>
					<TouchableOpacity style={[styles.primaryButton, { marginBottom: 10 }]} onPress={handleLogin}>
						<Text style={styles.primaryButtonText}>Login</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => navigation.navigate("Register")}>
						<Text style={[styles.label, { marginBottom: 10 }]}>
							Don't have an account yet? <Text style={styles.link}>Register</Text>
						</Text>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
						<Text style={styles.link}>Forgot Password?</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
		</ImageBackground>
	);
};

export default Login;
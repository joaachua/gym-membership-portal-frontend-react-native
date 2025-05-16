import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext, useTheme } from "@/styles/ThemeContext";
import { getGlobalStyles } from "@/styles/global";
import * as SecureStore from 'expo-secure-store';
import Toast from "react-native-toast-message";
import { resetPassword as resetPasswordApi } from "../../services/api";

const ResetPassword = ({ navigation, setHasAuthToken, route }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);

	const { token } = route.params;
	
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

	const resetPassword = async () => {
		try {
			const response = await resetPasswordApi({
                token,
				password: password,
                confirm_password: confirmPassword
			});

            if (response && response.success) {
                Toast.show({ type: "success", text1: "Password reset successfully!" });
    
                navigation.navigate("Login");
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
				Toast.show({ type: "error", text1: "Reset password failed." });
			}
		}

	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.content}>
				<Text style={styles.title}>Enter New Password</Text>
                <Text style={[styles.description, { paddingHorizontal: 20, paddingBottom: 10 }]}>{"Please enter the email address that you registered with to get reset otp."}</Text>
				<TextInput
					placeholder="Password"
					style={styles.input}
					value={password}
					onChangeText={setPassword}
					secureTextEntry
				/>
                <TextInput
				    placeholder="Confirm Password"
					style={styles.input}
					value={confirmPassword}
					onChangeText={setConfirmPassword}
					secureTextEntry
				/>
                <TouchableOpacity
					style={[styles.primaryButton, { marginBottom: 10 }]}
					onPress={resetPassword}
				>
		    		<Text style={styles.primaryButtonText}>Reset Password</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default ResetPassword;
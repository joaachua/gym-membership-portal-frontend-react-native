import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext, useTheme } from "@/styles/ThemeContext";
import { getGlobalStyles } from "@/styles/global";
import * as SecureStore from 'expo-secure-store';
import Toast from "react-native-toast-message";
import { verifyResetOtp } from "../../services/api";

const ResetOtp = ({ navigation, setHasAuthToken, route }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);

	const { email, phone_number } = route.params;
	
	const [otp, setOtp] = useState("");

	const verifyOtp = async () => {
		try {
			const response = await verifyResetOtp({
				email,
				reset_otp_code: otp
			});

			if (response && response.success) {
				Toast.show({ type: "success", text1: response?.message });

				navigation.navigate("ResetPassword", {
					token: response.data.reset_token
				});
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
				Toast.show({ type: "error", text1: "Verify otp failed." });
			}
		}

	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.content}>
				<Text style={styles.title}>Enter Reset OTP</Text>
				<TextInput
					style={styles.input}
					keyboardType="numeric"
					maxLength={6}
					value={otp}
					onChangeText={setOtp}
					placeholder="Enter 6-digit reset OTP"
				/>
                <TouchableOpacity
					style={[styles.primaryButton, { marginBottom: 10 }]}
					onPress={verifyOtp}
				>
		    		<Text style={styles.primaryButtonText}>Verify Reset OTP</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default ResetOtp;
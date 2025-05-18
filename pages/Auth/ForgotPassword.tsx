import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext, useTheme } from "@/styles/ThemeContext";
import { getGlobalStyles } from "@/styles/global";
import * as SecureStore from 'expo-secure-store';
import Toast from "react-native-toast-message";
import { forgotPassword as forgotPasswordApi } from "../../services/api";

const ForgotPassword = ({ navigation, setHasAuthToken }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);
	
    const [email, setEmail] = useState("");

	const forgotPassword = async () => {
		try {
			const response = await forgotPasswordApi({
				email
			});

            if (response && response.success) {
                Toast.show({ type: "success", text1: response?.message});
    
                navigation.navigate("ResetOtp", {
                    email,
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
				Toast.show({ type: "error", text1: "Reset password failed." });
			}
		}

	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.content}>
				<Text style={styles.title}>Enter Email Address</Text>
                <Text style={[styles.description, { paddingHorizontal: 20, paddingBottom: 10 }]}>{"Please enter the email address that you registered with to get reset otp."}</Text>
				<TextInput
					style={styles.input}
					value={email}
					onChangeText={setEmail}
					placeholder="Enter Email Address"
				/>
                <TouchableOpacity
					style={[styles.primaryButton, { marginBottom: 10 }]}
					onPress={forgotPassword}
				>
		    		<Text style={styles.primaryButtonText}>Get Reset OTP</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default ForgotPassword;
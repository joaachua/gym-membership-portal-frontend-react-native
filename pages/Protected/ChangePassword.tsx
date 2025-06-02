import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ThemeContext, useTheme } from "@/styles/ThemeContext";
import { getGlobalStyles } from "@/styles/global";
import * as SecureStore from 'expo-secure-store';
import Toast from "react-native-toast-message";
import { changePassword as changePasswordApi } from "../../services/api";

const ChangePassword = ({ navigation, setHasAuthToken }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);
    const [authToken, setAuthToken] = useState("");
	
    const [oldPassword, setOldPassword] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
		const checkToken = async () => {
			try {
				const token = await SecureStore.getItemAsync("auth_token");
				if (!token) {
					await SecureStore.deleteItemAsync("auth_token");
					setHasAuthToken(false);
					throw new Error("Token missing");
				}
                setAuthToken(token);
			} catch (error) {				
                const errorMessages = error.response?.data?.data;

                if (Array.isArray(errorMessages) && errorMessages.length > 0) {
                    // Join all messages separated by newline or comma
                    const messages = errorMessages.map((e: any) => e.message).join(", ");
                    Toast.show({ type: "error", text1: messages });
                } else if (error?.response?.data?.message === "Failed to authenticate token") {
                    Toast.show({ type: "error", text1: error?.response?.data?.message });
                    await SecureStore.deleteItemAsync("auth_token");
                    setHasAuthToken(false);
                } else if (error.response?.data?.message) {
                    Toast.show({ type: "error", text1: error.response.data.message });
                }
			}
		};

		checkToken();
	}, []);

	const changePassword = async () => {
		try {
			const response = await changePasswordApi(authToken, {
				old_password: oldPassword,
				new_password: password,
                confirm_password: confirmPassword
			});

            if (response && response.success) {
                Toast.show({ type: "success", text1: response?.message });
    
                //navigation.navigate("Login");
            }
		} catch (error: any) {
			const errorMessages = error.response?.data?.data;

			if (Array.isArray(errorMessages) && errorMessages.length > 0) {
				// Join all messages separated by newline or comma
				const messages = errorMessages.map((e: any) => e.message).join(", ");
				Toast.show({ type: "error", text1: messages });
			} else if (error?.response?.data?.message === "Failed to authenticate token") {
				Toast.show({ type: "error", text1: error?.response?.data?.message });
				await SecureStore.deleteItemAsync("auth_token");
				setHasAuthToken(false);
			} else if (error.response?.data?.message) {
				Toast.show({ type: "error", text1: error.response.data.message });
			}
		}

	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.content}>
				<Text style={styles.title}>Enter New Password</Text>
                <Text style={[styles.description, { paddingHorizontal: 20, paddingBottom: 10 }]}>{"Please enter your new password."}</Text>
				<TextInput
					placeholder="Old Password"
					style={styles.input}
					value={oldPassword}
					onChangeText={setOldPassword}
					secureTextEntry
				/>
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
					onPress={changePassword}
				>
		    		<Text style={styles.primaryButtonText}>Change Password</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default ChangePassword;
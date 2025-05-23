import React, { useContext, useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from "react-native";
import { ThemeContext, useTheme } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";
import { loginUser } from "../../services/api";

const CustomComponents = ({ navigation }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = async () => {
		try {
			const response = await loginUser({ email, password });
			const { token } = response.data;
			//Alert.alert(token);
			navigation.navigate("Register");
		} catch (error: any) {
			Alert.alert("Error", error.message || "Login failed");
			console.error("Error", error.message || "Login failed");
		}
	};

	return (
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
			<TouchableOpacity style={styles.button} onPress={handleLogin}>
				<Text style={styles.buttonText}>Login</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate("Register")}>
				<Text style={styles.label}>
					Don't have an account yet? <Text style={styles.link}>Register</Text>
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CustomComponents;
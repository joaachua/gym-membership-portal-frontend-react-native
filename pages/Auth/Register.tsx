import React, { useContext, useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ThemeContext } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";
import { registerUser } from "../../services/api";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const Register = ({ navigation }) => {
	const { theme } = useContext(ThemeContext);
	const styles = getGlobalStyles(theme);

	const [full_name, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone_number, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [platform, setPlatform] = useState(1);

	const validatePhoneNumber = (number: string) => {
		const phoneNumber = parsePhoneNumberFromString(number);
		if (!phoneNumber) return false;
		if (!phoneNumber.isValid()) return false;
		return true;
	};

	const handleRegister = async () => {
		// Validate email
		if (!email || !/\S+@\S+\.\S+/.test(email)) {
			Alert.alert("Please enter a valid email.");
			return;
		}

		// Validate phone number with country code
		if (!validatePhoneNumber(phone_number)) {
			Alert.alert("Please enter a valid phone number with country code.");
			return;
		}

		// Validate password (minimum 6 characters)
		if (password.length < 6) {
			Alert.alert("Password should be at least 6 characters long.");
			return;
		}

		// Proceed with registration
		Alert.alert("Registration successful!");
		try {
			const response = await registerUser({
				full_name,
				phone_number,
				email,
				password,
				platform,
			});
			Alert.alert("Registration successful!");
		} catch (error: any) {
			Alert.alert("Register failed");
		}
	};

	return (
		<>
		<View style={styles.container}>
			<TextInput
				placeholder="Full Name"
				style={styles.input}
				value={full_name}
				onChangeText={setFullName}
			/>
			<TextInput
				placeholder="Email"
				style={styles.input}
				value={email}
				onChangeText={setEmail}
			/>
			<TextInput
				placeholder="Phone Number"
				style={styles.input}
				value={phone_number}
				onChangeText={setPhoneNumber}
			/>
			<TextInput
				placeholder="Password"
				style={styles.input}
				value={password}
				onChangeText={setPassword}
				secureTextEntry
			/>

			<TouchableOpacity style={styles.button} onPress={handleRegister}>
				<Text style={styles.buttonText}>Register</Text>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => navigation.navigate("Login")}>
				<Text style={styles.label}>
					Already have an account? <Text style={styles.link}>Login</Text>
				</Text>
			</TouchableOpacity>
		</View>
		</>
	);
};

export default Register;

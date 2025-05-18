import React, { useContext, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Alert,
	TouchableOpacity,
	ScrollView,
	Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ThemeContext, useTheme } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";
import { registerUser } from "../../services/api";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";

const Register = ({ navigation }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);

	const salutationOption = [
		"MR.",
		"MRS.",
		"MS.",
		"MISS",
		"DR.",
		"PROF.",
		"ENGR.",
		"REV.",
		"HON.",
		"SIR",
		"MADAM",
	];

	const countryCodeOption = ["+60", "+65"];

	const [showDropdown, setShowDropdown] = useState(false);
	const [showCountryCodeDropdown, setShowCountryCodeDropdown] = useState(false);

	const [salutation, setSalutation] = useState("MR.");
	const [countryCode, setCountryCode] = useState("+60");
	const [username, setUsername] = useState("");
	const [full_name, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone_number, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [platform, setPlatform] = useState(1);

	const [isChecked, setIsChecked] = useState(false);
	const toggleCheckbox = () => setIsChecked(!isChecked);

	const handleRegister = async () => {
		// Validate email
		if (!email || !/\S+@\S+\.\S+/.test(email)) {
			Toast.show({ type: "error", text1: "Please enter a valid email." });
			return;
		}

		try {
			const response = await registerUser({
				salutation,
				full_name,
				username,
				phone_number: `${countryCode.replace("+", "")}${phone_number}`,
				email,
				password,
				platform,
			});

			if (response && response.success) {
				Toast.show({ type: "success", text1: response?.message });

				navigation.navigate("OtpScreen", {
					email,
					phone_number: `${countryCode.replace("+", "")}${phone_number}`,
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
				Toast.show({ type: "error", text1: "Registration failed." });
			}
		}
	};

	const handleDropdownPress = async () => {
		setShowDropdown((prev) => !prev);
	};

	const handleCountryCodeDropdownPress = async () => {
		setShowCountryCodeDropdown((prev) => !prev);
	};

	return (
		<>
			<SafeAreaView style={styles.safeArea}>
				<ScrollView contentContainerStyle={styles.scrollContent}>
					{/* 🔼 Banner Image */}
					<Image
						source={require("../../assets/img/auth-img-banner.jpg")} // Replace with your banner path
						style={styles.banner}
						resizeMode="cover"
					/>

					<View style={styles.container}>
						<View style={styles.dropDown}>
							{/* Dropdown - 25% */}
							<View style={{ flex: 1, marginRight: 8 }}>
								<TouchableOpacity
									style={[
										styles.input,
										{
											height: 50,
											justifyContent: "space-between",
											flexDirection: "row",
											alignItems: "center",
											paddingHorizontal: 10,
										},
									]}
									onPress={handleDropdownPress}
								>
									<Text style={styles.bodyText}>{salutation ? salutation : "MR."}</Text>
									<Icon
										name={
											showDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"
										}
										size={20}
										color="#333"
									/>
								</TouchableOpacity>

								{showDropdown && (
									<View style={styles.dropDownItem}>
										<ScrollView style={{ maxHeight: 150 }}>
											{salutationOption.map((option) => (
												<TouchableOpacity
													key={option}
													style={{ padding: 10 }}
													onPress={() => {
														setSalutation(option);
														setShowDropdown(false);
													}}
												>
													<Text style={styles.bodyText}>{option}</Text>
												</TouchableOpacity>
											))}
										</ScrollView>
									</View>
								)}
							</View>

							{/* Full Name - 75% */}
							<View style={{ flex: 2 }}>
								<TextInput
									placeholder="Full Name"
									style={[styles.input, { height: 50 }]}
									value={full_name}
									onChangeText={setFullName}
								/>
							</View>
						</View>

						<TextInput
							placeholder="Username"
							style={styles.input}
							value={username}
							onChangeText={setUsername}
						/>
						<TextInput
							placeholder="Email"
							style={styles.input}
							value={email}
							onChangeText={setEmail}
						/>

						<View style={styles.dropDown}>
							{/* Dropdown - 25% */}
							<View style={{ flex: 1, marginRight: 8 }}>
								<TouchableOpacity
									style={[
										styles.input,
										{
											height: 50,
											justifyContent: "space-between",
											flexDirection: "row",
											alignItems: "center",
											paddingHorizontal: 10,
										},
									]}
									onPress={handleCountryCodeDropdownPress}
								>
									<Text style={styles.bodyText}>{countryCode ? countryCode : "+60"}</Text>
									<Icon
										name={
											showDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"
										}
										size={20}
										color="#333"
									/>
								</TouchableOpacity>

								{showCountryCodeDropdown && (
									<View style={styles.dropDownItem}>
										<ScrollView style={{ maxHeight: 150 }}>
											{countryCodeOption.map((option) => (
												<TouchableOpacity
													key={option}
													style={{ padding: 10 }}
													onPress={() => {
														setCountryCode(option);
														setShowCountryCodeDropdown(false);
													}}
												>
													<Text style={styles.bodyText}>{option}</Text>
												</TouchableOpacity>
											))}
										</ScrollView>
									</View>
								)}
							</View>

							{/* Full Name - 75% */}
							<View style={{ flex: 2 }}>
								<TextInput
									placeholder="Phone Number"
									style={styles.input}
									value={phone_number}
									onChangeText={setPhoneNumber}
								/>
							</View>
						</View>

						<TextInput
							placeholder="Password"
							style={styles.input}
							value={password}
							onChangeText={setPassword}
							secureTextEntry
						/>

						<TouchableOpacity
							onPress={toggleCheckbox}
							style={styles.checkboxContainer}
						>
							<View style={[styles.checkbox, isChecked && styles.checked]} />
							<Text style={styles.label}>
								I agree to the{" "}
								<Text style={styles.link}>Terms & Conditions</Text>.
							</Text>
						</TouchableOpacity>

						<TouchableOpacity
							style={[styles.primaryButton, { marginBottom: 10 }]}
							onPress={handleRegister}
						>
							<Text style={styles.primaryButtonText}>Register</Text>
						</TouchableOpacity>

						<TouchableOpacity onPress={() => navigation.navigate("Login")}>
							<Text style={styles.label}>
								Already have an account? <Text style={styles.link}>Login</Text>
							</Text>
						</TouchableOpacity>
					</View>
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

export default Register;

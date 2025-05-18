import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Alert,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
	ImageBackground,
	Modal,
} from "react-native";
import { ThemeContext, useTheme } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";
import { getProfile, logout, updateProfile } from "../../services/api";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomNavBar from "../Components/Custom/CustomNavBar";
import { colors } from "@/styles/themes";

const Profile = ({ navigation, setHasAuthToken }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);
	const [profile, setProfile] = useState(null);
	const [isVisible, setIsVisible] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);

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

    const [authToken, setAuthToken] = useState("");

	const [salutation, setSalutation] = useState("MR.");
	const [countryCode, setCountryCode] = useState("+60");
	const [username, setUsername] = useState("");
	const [full_name, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone_number, setPhoneNumber] = useState("");

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
				const response = await getProfile(token); // e.g. GET /me
				if (response && response.success) {
					setProfile(response.data);

					setSalutation(response.data?.salutation);
					setUsername(response.data?.username);
					setFullName(response.data?.full_name);
					setEmail(response.data?.email);

					if (response.data.phone_number) {
						const matchedCode = countryCodeOption.find(code =>
						  	response.data.phone_number.startsWith(code)
						);
					  
						if (matchedCode) {
						  	const nationalNumber = response.data.phone_number.slice(matchedCode.length);
						  	setCountryCode("+" + matchedCode);
						  	setPhoneNumber(nationalNumber);
						} else {
						 	// fallback if no country code matched
						  	setCountryCode("");
						  	setPhoneNumber(response.data.phone_number);
						}
					}	  
				}
			} catch (error) {
				Toast.show({ type: "error", text1: "Session expired" });
				await SecureStore.deleteItemAsync("auth_token");
				setHasAuthToken(false);
				navigation.replace("Login"); // ensure 'Login' is in your AuthNavigator
			}
		};

		checkToken();
	}, []);

	const handleDropdownPress = async () => {
		setShowDropdown((prev) => !prev);
	};

	const handleCountryCodeDropdownPress = async () => {
		setShowCountryCodeDropdown((prev) => !prev);
	};

	const handleUpdateProfile = async () => {
		try {
			const response = await updateProfile(authToken, {
				salutation, 
				username, 
				full_name, 
				email, 
				phone_number: `${countryCode.replace("+", "")}${phone_number}`
			});

			console.log(response);
			if (response && response.success) {
				Toast.show({ type: "success", text1: response?.message });
			}
		} catch (error) {
			const errorMessages = error.response?.data?.data;

			if (Array.isArray(errorMessages) && errorMessages.length > 0) {
				// Join all messages separated by newline or comma
				const messages = errorMessages.map((e: any) => e.message).join(", ");
				Toast.show({ type: "error", text1: messages });
			} else if (error.response?.data?.message) {
				Toast.show({ type: "error", text1: error.response.data.message });
			} else if (error?.response?.data?.message === "Failed to authenticate token") {
				Toast.show({ type: "error", text1: error?.response?.data?.message });
				await SecureStore.deleteItemAsync("auth_token");
				setHasAuthToken(false);
			}
		}
	};

	const handleLogout = async () => {
		try {
			const response = await logout(authToken);

			if (response && response.success) {
				Toast.show({ type: "success", text1: response?.message });
				await SecureStore.deleteItemAsync("auth_token");
				setHasAuthToken(false);
			}
		} catch (error) {
			const errorMessages = error.response?.data?.data;

			if (Array.isArray(errorMessages) && errorMessages.length > 0) {
				// Join all messages separated by newline or comma
				const messages = errorMessages.map((e: any) => e.message).join(", ");
				Toast.show({ type: "error", text1: messages });
			} else if (error.response?.data?.message) {
				Toast.show({ type: "error", text1: error.response.data.message });
			} else if (error?.response?.data?.message === "Failed to authenticate token") {
				Toast.show({ type: "error", text1: error?.response?.data?.message });
				await SecureStore.deleteItemAsync("auth_token");
				setHasAuthToken(false);
			}
		}
	};

	const confirmLogout = () => {
		setIsVisible(false);
		handleLogout();
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.mainContent}>
					{/* Section 1: Search + Greeting */}
					<View style={styles.section}>
						<Text style={[styles.greeting, { marginBottom: 15 }]}>Profile</Text>

						<TouchableOpacity
							style={[
								styles.hoveringRightButton,
								{
									top: 0,
									height: 35,
									justifyContent: "space-between",
									flexDirection: "row",
									alignItems: "center",
									paddingHorizontal: 10,
								},
							]}
							onPress={() => {
								if (!isDisabled) {
									handleUpdateProfile();
								}

								setIsDisabled(!isDisabled);
							}}
						>
							<Text style={styles.hoveringRightButtonText}>
								{isDisabled ? "Edit" : "Done"}
							</Text>
						</TouchableOpacity>

						<Text style={styles.sectionTitle}>Personal Information</Text>
						<View style={styles.dropDown}>
							{/* Dropdown - 25% */}
							<View style={{ flex: 1, marginRight: 8 }}>
								<TouchableOpacity
									disabled={isDisabled}
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
									<Text
										style={[
											styles.bodyText,
											{
												color: isDisabled ? "#A6A6A6" : colors[theme].bodyText,
											},
										]}
									>
										{salutation ? salutation : "MR."}
									</Text>
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
									editable={!isDisabled}
									placeholder="Full Name"
									style={[
										styles.input,
										{
											height: 50,
											color: isDisabled ? "#A6A6A6" : colors[theme].bodyText,
										},
									]}
									value={full_name}
									onChangeText={setFullName}
								/>
							</View>
						</View>

						<TextInput
							editable={!isDisabled}
							placeholder="Username"
							style={[
								styles.input,
								{ color: isDisabled ? "#A6A6A6" : colors[theme].bodyText },
							]}
							value={username}
							onChangeText={setUsername}
						/>
						<TextInput
							editable={!isDisabled}
							placeholder="Email"
							style={[
								styles.input,
								{ color: isDisabled ? "#A6A6A6" : colors[theme].bodyText },
							]}
							value={email}
							onChangeText={setEmail}
						/>

						<View style={styles.dropDown}>
							{/* Dropdown - 25% */}
							<View style={{ flex: 1, marginRight: 8 }}>
								<TouchableOpacity
									disabled={isDisabled}
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
									<Text
										style={[
											styles.bodyText,
											{
												color: isDisabled ? "#A6A6A6" : colors[theme].bodyText,
											},
										]}
									>
										{countryCode ? countryCode : "+60"}
									</Text>
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
									editable={!isDisabled}
									placeholder="Phone Number"
                                    style={[
                                        styles.input,
                                        { color: isDisabled ? "#A6A6A6" : colors[theme].bodyText },
                                    ]}
									value={phone_number}
									onChangeText={setPhoneNumber}
								/>
							</View>
						</View>
					</View>

					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Other Settings</Text>
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
							onPress={() => navigation.navigate("ChangePassword")}
						>
							<Text style={styles.bodyText}>{"Change Password"}</Text>
							<Icon name={"keyboard-arrow-right"} size={20} color="#333" />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => setIsVisible(true)}
							style={[styles.blocks, { borderColor: "red" }]}
						>
							<Text
								style={[
									styles.buttonText,
									{ color: "red", textAlign: "center" },
								]}
							>
								Logout
							</Text>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
			
			<Modal
				visible={isVisible}
				transparent
				animationType="fade"
				onRequestClose={() => setIsVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.modalText}>Are you sure you want to logout?</Text>
						<View style={styles.modalActions}>
							<TouchableOpacity onPress={confirmLogout} style={styles.confirmButton}>
								<Text style={styles.buttonText}>Yes, confirm</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setIsVisible(false)} style={styles.cancelButton}>
								<Text style={[styles.buttonText, {color: colors[theme].accent}]}>Cancel</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
			<CustomNavBar navigation={navigation} />
		</SafeAreaView>
	);
};

export default Profile;

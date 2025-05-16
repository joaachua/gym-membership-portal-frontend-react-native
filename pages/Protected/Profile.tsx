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
} from "react-native";
import { ThemeContext, useTheme } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";
import { getProfile } from "../../services/api";
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

	const [salutation, setSalutation] = useState("MR.");
	const [countryCode, setCountryCode] = useState("+60");
	const [username, setUsername] = useState("");
	const [full_name, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [phone_number, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		const checkToken = async () => {
			try {
				const token = await SecureStore.getItemAsync("auth_token");
				if (!token) {
					await SecureStore.deleteItemAsync("auth_token");
					setHasAuthToken(false);
					throw new Error("Token missing");
				}

				const response = await getProfile(token); // e.g. GET /me
				if (response && response.success) {
					setProfile(response.data);

					setSalutation(response.data?.salutation);
					setUsername(response.data?.username);
					setFullName(response.data?.full_name);
					setEmail(response.data?.email);
					setCountryCode("+60");
					setPhoneNumber(response.data?.phone_number);
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

	const handleLogout = () => {
		throw new Error("Function not implemented.");
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
							onPress={() => setIsDisabled(!isDisabled)}
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
							onPress={handleLogout}
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

			<CustomNavBar navigation={navigation} />
		</SafeAreaView>
	);
};

export default Profile;

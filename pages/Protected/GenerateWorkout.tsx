import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemeContext, useTheme } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";
import {
	logWorkout,
	generateWorkout,
	calculateCalorie,
} from "../../services/api";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import * as SecureStore from "expo-secure-store";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";

const GenerateWorkout = ({ navigation, setHasAuthToken }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);
	const [authToken, setAuthToken] = useState("");

	const [goal, setGoal] = useState("strength");
	const [level, setLevel] = useState("beginner");
	const [equipment, setEquipment] = useState("none");
	const [showGoalDropdown, setShowGoalDropdown] = useState(false);
	const [showLevelDropdown, setShowLevelDropdown] = useState(false);
	const [showEquipmentDropdown, setShowEquipmentDropdown] = useState(false);

	const goalOption = ["strength", "cardio", "flexibility", "general"];

	const levelOption = ["beginner", "intermediate", "advanced"];

	const equimentOption = ["none", "basic", "full"];

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
				} else if (error.response?.data?.message) {
					Toast.show({ type: "error", text1: error.response.data.message });
				} else if (
					error?.response?.data?.message === "Failed to authenticate token"
				) {
					Toast.show({ type: "error", text1: error?.response?.data?.message });
					await SecureStore.deleteItemAsync("auth_token");
					setHasAuthToken(false);
				}
			}
		};

		checkToken();
	}, []);

	const handleGenerateWorkoutPlan = async () => {
		try {
			const plan = await generateWorkout(authToken, {
				goal,
				level,
				equipment,
			});
			console.log(plan);
			//alert(plan.data.join("\n")); // simple way to show plan
		} catch (error) {
			console.error("Error generating workout plan:", error);
		}
	};

	const handleGoalDropdown = async () => {
		setShowGoalDropdown((prev) => !prev);
	};

	const handleLevelDropdown = async () => {
		setShowLevelDropdown((prev) => !prev);
	};

	const handleEquipmentDropdown = async () => {
		setShowEquipmentDropdown((prev) => !prev);
	};

	return (
		<>
			<SafeAreaView style={styles.safeArea}>
				<ScrollView contentContainerStyle={styles.scrollContent}>
					<View style={styles.mainContent}>
						<View style={styles.section}>
							<Text style={[styles.greeting, { marginBottom: 15 }]}>
								Want to get started from our recommended workouts?
							</Text>

							<Text style={styles.bodyText}>What's your goal?</Text>
							<View style={styles.dropDown}>
								<View style={{ flex: 1 }}>
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
										onPress={handleGoalDropdown}
									>
										<Text
											style={[
												styles.bodyText,
												{
													width: '90%',
													textTransform: "capitalize",
												},
											]}
										>
											{goal ? goal : "strength"}
										</Text>
										<Icon
											name={
												showGoalDropdown
													? "keyboard-arrow-up"
													: "keyboard-arrow-down"
											}
											size={20}
											color="#333"
										/>
									</TouchableOpacity>

									{showGoalDropdown && (
										<View style={styles.dropDownItem}>
											<ScrollView style={{ maxHeight: 150 }}>
												{goalOption.map((option) => (
													<TouchableOpacity
														key={option}
														style={{ padding: 10 }}
														onPress={() => {
															setGoal(option);
															setShowGoalDropdown(false);
														}}
													>
														<Text
															style={[
																styles.bodyText,
																{
																	width: '100%',
																	textTransform: "capitalize",
																},
															]}
														>
															{option}
														</Text>
													</TouchableOpacity>
												))}
											</ScrollView>
										</View>
									)}
								</View>
							</View>

							<Text style={styles.bodyText}>What intensity do you prefer?</Text>
							<View style={styles.dropDown}>
								{/* Dropdown - 25% */}
								<View style={{ flex: 1 }}>
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
										onPress={handleLevelDropdown}
									>
										<Text
											style={[
												styles.bodyText,
												{
													width: '90%',
													textTransform: "capitalize",
												},
											]}
										>
											{level ? level : "beginner"}
										</Text>
										<Icon
											name={
												showLevelDropdown
													? "keyboard-arrow-up"
													: "keyboard-arrow-down"
											}
											size={20}
											color="#333"
										/>
									</TouchableOpacity>

									{showLevelDropdown && (
										<View style={styles.dropDownItem}>
											<ScrollView style={{ maxHeight: 150 }}>
												{levelOption.map((option) => (
													<TouchableOpacity
														key={option}
														style={{ padding: 10 }}
														onPress={() => {
															setLevel(option);
															setShowLevelDropdown(false);
														}}
													>
														<Text
															style={[
																styles.bodyText,
																{
																	width: '100%',
																	textTransform: "capitalize",
																},
															]}
														>
															{option}
														</Text>
													</TouchableOpacity>
												))}
											</ScrollView>
										</View>
									)}
								</View>
							</View>

							<Text style={styles.bodyText}>
								What's your stamina/strength level?
							</Text>
							<View style={styles.dropDown}>
								{/* Dropdown - 25% */}
								<View style={{ flex: 1 }}>
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
										onPress={handleEquipmentDropdown}
									>
										<Text
											style={[
												styles.bodyText,
												{
													width: '90%',
													textTransform: "capitalize",
												},
											]}
										>
											{equipment ? equipment : "none"}
										</Text>
										<Icon
											name={
												showEquipmentDropdown
													? "keyboard-arrow-up"
													: "keyboard-arrow-down"
											}
											size={20}
											color="#333"
										/>
									</TouchableOpacity>

									{showEquipmentDropdown && (
										<View style={styles.dropDownItem}>
											<ScrollView style={{ maxHeight: 150 }}>
												{equimentOption.map((option) => (
													<TouchableOpacity
														key={option}
														style={{ padding: 10 }}
														onPress={() => {
															setEquipment(option);
															setShowEquipmentDropdown(false);
														}}
													>
														<Text
															style={[
																styles.bodyText,
																{
																	width: '100%',
																	textTransform: "capitalize",
																},
															]}
														>
															{option}
														</Text>
													</TouchableOpacity>
												))}
											</ScrollView>
										</View>
									)}
								</View>
							</View>
							<TouchableOpacity
								style={[styles.primaryButton, { marginBottom: 10 }]}
								onPress={handleGenerateWorkoutPlan}
							>
								<Text style={styles.primaryButtonText}>Generate Workout</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

export default GenerateWorkout;

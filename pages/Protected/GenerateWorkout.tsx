import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	ActivityIndicator,
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
import { colors } from "@/styles/themes";

const GenerateWorkout = ({ navigation, setHasAuthToken }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);
	const [authToken, setAuthToken] = useState("");
	const [loading, setLoading] = useState(false);

	const [muscleGroup, setMuscleGroup] = useState("Forearms");
	const [equipment, setEquipment] = useState("");
	const [rating, setRating] = useState("9.6");
	const [showMuscleGroupDropDown, setShowMuscleGroupDropdown] = useState(false);
	const [showEquipmentDropdown, setShowEquipmentDropdown] = useState(false);
	const [showRatingDropdown, setShowRatingDropdown] = useState(false);
	const [generatedWorkouts, setGeneratedWorkouts] = useState([]);

	const muscleGroupOption = [
		"Forearms",
		"Quadriceps",
		"Abdominals",
		"Lats",
		"Middle Back",
		"Lower Back",
		"Shoulders",
		"Biceps",
		"Glutes",
		"Triceps",
		"Hamstrings",
		"Neck",
		"Chest",
		"Traps",
		"Calves",
		"Abductors",
		"Adductors"
	];

	const equimentOption = [
		"",
		"Other",
		"Machine",
		"Barbell",
		"Dumbbell",
		"Body Only",
		"Kettlebells",
		"Cable",
		"E-Z Curl Bar",
		"None",
		"Bands",
		"Medicine Ball",
		"Cables",
		"Exercise Ball",
		"Weight Bench",
		"Dumbbells",
	];

	const ratingOption = [
		"9.6",
		"9.5",
		"9.4",
		"9.3",
		"9.2",
		"9.1",
		"9",
		"8.9",
		"8.8",
		"8.7",
		"8.6",
		"8.5",
		"8.4",
		"8.3"
	];

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
				} else if (
					error?.response?.data?.message === "Failed to authenticate token"
				) {
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

	const handleGenerateWorkoutPlan = async () => {
		try {
			setLoading(true);
			const plan = await generateWorkout(authToken, {
				muscle_group: muscleGroup,
				equipment,
				rating,
			});

			if (plan.success) {
				setLoading(false);
				setGeneratedWorkouts(plan.data?.workouts || []);
			}
			//alert(plan.data.join("\n")); // simple way to show plan
		} catch (error) {
			setLoading(false);
			const errorMessages = error.response?.data?.data;

			if (Array.isArray(errorMessages) && errorMessages.length > 0) {
				// Join all messages separated by newline or comma
				const messages = errorMessages.map((e: any) => e.message).join(", ");
				Toast.show({ type: "error", text1: messages });
			} else if (
				error?.response?.data?.message === "Failed to authenticate token"
			) {
				Toast.show({ type: "error", text1: error?.response?.data?.message });
				await SecureStore.deleteItemAsync("auth_token");
				setHasAuthToken(false);
			} else if (error.response?.data?.message) {
				Toast.show({ type: "error", text1: error.response.data.message });
			} 
		}
	};

	const handleMuscleGroupDropdown = async () => {
		setShowMuscleGroupDropdown((prev) => !prev);
	};

	const handleEquipmentDropdown = async () => {
		setShowEquipmentDropdown((prev) => !prev);
	};

	const handleRatingDropdown = async () => {
		setShowRatingDropdown((prev) => !prev);
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

							<Text style={styles.bodyText}>Which muscle group do you want to target?</Text>
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
										onPress={handleMuscleGroupDropdown}
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
											{muscleGroup ? muscleGroup : "Forearms"}
										</Text>
										<Icon
											name={
												showMuscleGroupDropDown
													? "keyboard-arrow-up"
													: "keyboard-arrow-down"
											}
											size={20}
											color="#333"
										/>
									</TouchableOpacity>

									{showMuscleGroupDropDown && (
										<View style={styles.dropDownItem}>
											<ScrollView style={{ maxHeight: 150 }}>
												{muscleGroupOption.map((option) => (
													<TouchableOpacity
														key={option}
														style={{ padding: 10 }}
														onPress={() => {
															setMuscleGroup(option);
															setShowMuscleGroupDropdown(false);
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

							<Text style={styles.bodyText}>Rating of the exercise, may be interpreted as a measure of optimality</Text>
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
										onPress={handleRatingDropdown}
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
											{rating ? rating : "9.6"}
										</Text>
										<Icon
											name={
												showRatingDropdown
													? "keyboard-arrow-up"
													: "keyboard-arrow-down"
											}
											size={20}
											color="#333"
										/>
									</TouchableOpacity>

									{showRatingDropdown && (
										<View style={styles.dropDownItem}>
											<ScrollView style={{ maxHeight: 150 }}>
												{ratingOption.map((option) => (
													<TouchableOpacity
														key={option}
														style={{ padding: 10 }}
														onPress={() => {
															setRating(option);
															setShowRatingDropdown(false);
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
								Do you have equipments?
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
								disabled={loading}
								style={[styles.primaryButton, { 
									opacity: loading ? 0.5 : 1,
									marginBottom: 10 
								}]}
								onPress={handleGenerateWorkoutPlan}
							>
								<Text style={styles.primaryButtonText}>{loading ? "Loading" : "Generate Workout"}</Text>
							</TouchableOpacity>
						</View>
						
						{loading &&
							<ActivityIndicator size="large" color={colors[theme].accent} />
						}

						{!loading && generatedWorkouts.length > 0 && (
							<View style={[styles.section, { marginTop: 20 }]}>
								<Text style={[styles.bodyText, { marginBottom: 10 }]}>
									Your Recommended Workouts:
								</Text>
								{generatedWorkouts.map((workout, index) => (
									<View
										key={index}
										style={{
											backgroundColor: "#f0f0f0",
											padding: 12,
											borderRadius: 8,
											marginBottom: 8,
										}}
									>
										<Text style={styles.bodyText}>{workout}</Text>
									</View>
								))}
							</View>
						)}
					</View>
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

export default GenerateWorkout;

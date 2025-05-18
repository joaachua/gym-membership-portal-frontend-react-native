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
import { Picker } from "@react-native-picker/picker";

import * as SecureStore from "expo-secure-store";
import { ThemeContext, useTheme } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";
import { logWorkout, calculateCalorie } from "../../services/api";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "@/styles/themes";

const WorkoutLog = ({ navigation, setHasAuthToken }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);
	const [authToken, setAuthToken] = useState("");

	const [isDisabled, setIsDisabled] = useState(true);
	const [exercise, setExercise] = useState("push-ups");
	const [duration, setDuration] = useState("");
	const [weight, setWeight] = useState("");
	const [calories, setCalories] = useState("");

	const [showExerciseDropdown, setShowExerciseDropdown] = useState(false);

	const exerciseOption = [
		"push-ups",
		"squats",
		"planks",
		"jumping jacks",
		"running",
		"cycling",
		"walking",
		"weight training",
		"hiit",
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

	const handleExerciseDropdown = async () => {
		setShowExerciseDropdown((prev) => !prev);
	};

	const handleCalorieCalculation = async () => {
		try {
			const response = await calculateCalorie(authToken, {
				exercise,
				duration: Number(duration),
				weightKg: Number(weight),
			});

			//console.log(result);
			if (response && response.success && response.data) {
				setCalories(String(response.data.calories)); //19.2
			}
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

	const handleLogWorkout = async () => {
		try {
			const response = await logWorkout(authToken, {
				exercise,
				duration: Number(duration),
				weightKg: Number(weight),
				calories_burned: String(calories) ?? "0",
			});

			//console.log(result);
			if (response && response.success && response.data) {
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
			} else if (
				error?.response?.data?.message === "Failed to authenticate token"
			) {
				Toast.show({ type: "error", text1: error?.response?.data?.message });
				await SecureStore.deleteItemAsync("auth_token");
				setHasAuthToken(false);
			}
		}

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

							<Text style={styles.bodyText}>Workout</Text>
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
										onPress={handleExerciseDropdown}
									>
										<Text
											style={[
												styles.bodyText,
												{
													width: "90%",
													textTransform: "capitalize",
												},
											]}
										>
											{exercise ? exercise : "push-ups"}
										</Text>
										<Icon
											name={
												showExerciseDropdown
													? "keyboard-arrow-up"
													: "keyboard-arrow-down"
											}
											size={20}
											color="#333"
										/>
									</TouchableOpacity>

									{showExerciseDropdown && (
										<View style={styles.dropDownItem}>
											<ScrollView style={{ maxHeight: 150 }}>
												{exerciseOption.map((option) => (
													<TouchableOpacity
														key={option}
														style={{ padding: 10 }}
														onPress={() => {
															setExercise(option);
															setShowExerciseDropdown(false);
														}}
													>
														<Text
															style={[
																styles.bodyText,
																{
																	width: "100%",
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

							<Text style={styles.bodyText}>Duration (minutes): </Text>
							<TextInput
								placeholder="Duration (minutes)"
								style={[styles.input]}
								value={duration}
								onChangeText={setDuration}
								keyboardType="numeric"
							/>

							<Text style={styles.bodyText}>Bodyweight (kg):</Text>
							<TextInput
								placeholder="Bodyweight (kg)"
								style={[styles.input]}
								value={weight}
								onChangeText={setWeight}
								keyboardType="numeric"
							/>

							<Text style={styles.bodyText}>Calories burnt (kcal):</Text>
							<TouchableOpacity
								style={[
									styles.secondaryButton,
									{
										alignSelf: "flex-end",
										alignItems: "center",
										marginTop: 5,
										maxWidth: "40%",
									},
								]}
								onPress={() => setIsDisabled(prev => !prev)}
							>
								<Text style={[styles.secondaryButtonText]}>{isDisabled ? "Custom input" : "System Generated" }</Text>
							</TouchableOpacity>
							<TextInput
								editable={!isDisabled}
								placeholder={isDisabled ? "" : "Calories burnt (kcal)"}
								style={[
									styles.input,
									{
										backgroundColor: isDisabled
											? "#EDEDED"
											: colors[theme].formatted,
										color: isDisabled ? "#A6A6A6" : colors[theme].bodyText,
									},
								]}
								value={calories}
								onChangeText={setCalories}
								keyboardType="numeric"
							/>

						<TouchableOpacity
							style={[styles.outlinePrimaryButton, { marginBottom: 10 }]}
							onPress={() => handleCalorieCalculation()}
						>
							<Text style={styles.outlinePrimaryButtonText}>Calculate Calories</Text>
						</TouchableOpacity><TouchableOpacity
							style={[styles.primaryButton, { marginBottom: 10 }]}
							onPress={()=> handleLogWorkout()}
						>
							<Text style={styles.primaryButtonText}>Record Workout</Text>
						</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
			{/*<GestureHandlerRootView style={styles.container}>
			<Text>Workout Tracker</Text>

			<Text>Exercise:</Text>
			<TextInput
				style={styles.input}
				value={exercise}
				onChangeText={setExercise}
				placeholder="e.g. Push-ups"
			/>

			<Text>Duration (minutes):</Text>
			<TextInput
				style={styles.input}
				value={duration}
				onChangeText={setDuration}
				keyboardType="numeric"
				placeholder="e.g. 30"
			/>

			<Text>Weight (kg):</Text>
			<TextInput
				style={styles.input}
				value={weight}
				onChangeText={setWeight}
				keyboardType="numeric"
				placeholder="e.g. 70"
			/>

			<Button title="Calculate Calories" onPress={handleCalorieCalculation} />
			{calories && <Text>Calories Burned: {calories}</Text>}

			<Button title="Log Workout" onPress={handleLogWorkout} />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("GenerateWorkout")}>
				<Text style={styles.buttonText}>Generate Workout</Text>
			</TouchableOpacity>
			<StatusBar style="auto" />
		</GestureHandlerRootView>*/}
		</>
	);
};

export default WorkoutLog;

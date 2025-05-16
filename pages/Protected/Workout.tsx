import React, { useContext, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { ThemeContext, useTheme } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";
import {
	logWorkout,
	generateWorkout,
	calculateCalorie,
} from "../../services/api";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

const WorkoutPage = ({ navigation, setHasAuthToken }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);

	const [exercise, setExercise] = useState("");
	const [duration, setDuration] = useState("");
	const [weight, setWeight] = useState("");
	const [calories, setCalories] = useState(null);
	const [goal, setGoal] = useState<number | null>(null);
	const [fitnessLevel, setFitnessLevel] = useState<number | null>(null);
	const [hasEquipment, setHasEquipment] = useState<boolean>(false);
	const [hoursPerWeek, setHoursPerWeek] = useState<string>("");

	const handleCalorieCalculation = async () => {
		try {
			const result = await calculateCalorie({
				exercise,
				duration: Number(duration),
				weightKg: Number(weight),
			});
            //console.log(result);
			setCalories(result.data.calories);
		} catch (error) {
			console.error("Error calculating calories:", error);
		}
	};

	const handleLogWorkout = async () => {
		try {
			await logWorkout({
				user_id: 1, // replace with dynamic user ID
				exercise,
				duration: Number(duration),
				weightKg: Number(weight),
				date: new Date().toISOString(),
				calories_burned: calories ?? 0,
			});
			alert("Workout logged successfully!");
		} catch (error) {
			console.error("Error logging workout:", error);
		}
	};

	const handleGenerateWorkoutPlan = async () => {
		try {
			const plan = await generateWorkout({
				age: 25, // replace with dynamic age if needed
				goal,
				fitness_level: fitnessLevel,
				hours_per_week: Number(hoursPerWeek),
				has_equipment: hasEquipment,
			});
			alert(plan.join("\n")); // simple way to show plan
		} catch (error) {
			console.error("Error generating workout plan:", error);
		}
	};

	return (
		<GestureHandlerRootView style={styles.container}>
			<Text>Workout Tracker</Text>

			{/* Inputs for exercise logging */}
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

			{/* Button to calculate calories */}
			<Button title="Calculate Calories" onPress={handleCalorieCalculation} />
			{calories && <Text>Calories Burned: {calories}</Text>}

			{/* Button to log workout */}
			<Button title="Log Workout" onPress={handleLogWorkout} />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("GenerateWorkout")}>
				<Text style={styles.buttonText}>Generate Workout</Text>
			</TouchableOpacity>
			<StatusBar style="auto" />
		</GestureHandlerRootView>
	);
};

export default WorkoutPage;

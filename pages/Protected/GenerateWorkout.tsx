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

const GenerateWorkout = ({ navigation, setHasAuthToken }) => {
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

	const handleGenerateWorkoutPlan = async () => {
		try {
			const plan = await generateWorkout({
				age: 25, // replace with dynamic age if needed
				goal,
				fitness_level: fitnessLevel,
				hours_per_week: Number(hoursPerWeek),
				has_equipment: hasEquipment,
			});
			alert(plan.data.join("\n")); // simple way to show plan
		} catch (error) {
			console.error("Error generating workout plan:", error);
		}
	};

	return (
		<GestureHandlerRootView style={styles.container}>
			<Text>Workout Plan</Text>

			{/* Inputs for generating workout plan */}
			<Text>Goal:</Text>
			<Picker
				selectedValue={goal}
				style={styles.input}
				onValueChange={(itemValue) => setGoal(itemValue)}
			>
				<Picker.Item label="Fat loss" value={0} />
				<Picker.Item label="Muscle gain" value={1} />
				<Picker.Item label="Endurance" value={2} />
			</Picker>

			<Text>Fitness Level:</Text>
			<Picker
				selectedValue={fitnessLevel}
				style={styles.input}
				onValueChange={(itemValue) => setFitnessLevel(itemValue)}
			>
				<Picker.Item label="Beginner" value="0" />
				<Picker.Item label="Intermediate" value="1" />
				<Picker.Item label="Advanced" value="2" />
			</Picker>

			<Text>Hours per Week:</Text>
			<TextInput
				style={styles.input}
				value={hoursPerWeek}
				onChangeText={setHoursPerWeek}
				keyboardType="numeric"
				placeholder="e.g. 4"
			/>

			<Text>Has Equipment:</Text>
			<Picker
				selectedValue={hasEquipment}
				style={styles.input}
				onValueChange={(itemValue) => setHasEquipment(itemValue)}
			>
				<Picker.Item label="No" value={false} />
				<Picker.Item label="Yes" value={true} />
			</Picker>

			{/* Button to generate workout plan */}
			<Button
				title="Generate Workout Plan"
				onPress={handleGenerateWorkoutPlan}
			/>
			<TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Workout")}>
				<Text style={styles.buttonText}>Workout Tracker and Log</Text>
			</TouchableOpacity>
			<StatusBar style="auto" />
		</GestureHandlerRootView>
	);
};

export default GenerateWorkout;

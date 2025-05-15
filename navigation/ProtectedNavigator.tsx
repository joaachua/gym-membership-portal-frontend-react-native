import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Workout from "../pages/Protected/Workout";
import GenerateWorkout from "../pages/Protected/GenerateWorkout";

const Stack = createNativeStackNavigator();

export default function ProtectedNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Workout" component={Workout} />
			<Stack.Screen name="GenerateWorkout" component={GenerateWorkout} />
		</Stack.Navigator>
	);
}

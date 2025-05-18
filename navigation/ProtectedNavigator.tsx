import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/pages/Protected/Home";
import Workout from "@/pages/Protected/Workout";
import GenerateWorkout from "@/pages/Protected/GenerateWorkout";
import Profile from "@/pages/Protected/Profile";
import ChangePassword from "@/pages/Protected/ChangePassword";

const Stack = createNativeStackNavigator();

export default function ProtectedNavigator({ setHasAuthToken }) {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home">
				{(props) => (
					<Home {...props} setHasAuthToken={setHasAuthToken} />
				)}
			</Stack.Screen>
			<Stack.Screen name="Workout">
				{(props) => (
					<Workout {...props} setHasAuthToken={setHasAuthToken} />
				)}
			</Stack.Screen>
			<Stack.Screen name="GenerateWorkout">
				{(props) => (
					<GenerateWorkout {...props} setHasAuthToken={setHasAuthToken} />
				)}
			</Stack.Screen>
			<Stack.Screen name="Profile">
				{(props) => (
					<Profile {...props} setHasAuthToken={setHasAuthToken} />
				)}
			</Stack.Screen>
			<Stack.Screen name="ChangePassword">
				{(props) => (
					<ChangePassword {...props} setHasAuthToken={setHasAuthToken} />
				)}
			</Stack.Screen>
		</Stack.Navigator>
	);
}

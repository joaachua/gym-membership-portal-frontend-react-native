import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/pages/Protected/Home";
import WorkoutLog from "@/pages/Protected/WorkoutLog";
import GenerateWorkout from "@/pages/Protected/GenerateWorkout";
import Profile from "@/pages/Protected/Profile";
import ChangePassword from "@/pages/Protected/ChangePassword";
import WorkoutLogList from "@/pages/Protected/WorkoutLogList";
import ViewCentre from "@/pages/Protected/ViewCentre";
import ViewClass from "@/pages/Protected/ViewClass";
import RegisterClassList from "@/pages/Protected/Classes";

const Stack = createNativeStackNavigator();

export default function ProtectedNavigator({ setHasAuthToken }) {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home">
				{(props) => (
					<Home {...props} setHasAuthToken={setHasAuthToken} />
				)}
			</Stack.Screen>
			<Stack.Screen name="WorkoutLogList">
				{(props) => (
					<WorkoutLogList {...props} setHasAuthToken={setHasAuthToken} />
				)}
			</Stack.Screen>
			<Stack.Screen name="WorkoutLog">
				{(props) => (
					<WorkoutLog {...props} setHasAuthToken={setHasAuthToken} />
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

			<Stack.Screen name="ViewCentre">
				{(props) => <ViewCentre {...props} setHasAuthToken={setHasAuthToken} />}
			</Stack.Screen>
			<Stack.Screen name="ViewClass">
				{(props) => <ViewClass {...props} setHasAuthToken={setHasAuthToken} />}
			</Stack.Screen>
			<Stack.Screen name="RegisterClassList">
				{(props) => <RegisterClassList {...props} setHasAuthToken={setHasAuthToken} />}
			</Stack.Screen>
		</Stack.Navigator>
	);
}

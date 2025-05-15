import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Auth/Login"; // path to your Login screen
import Register from "../pages/Auth/Register";

const Stack = createNativeStackNavigator();

export default function AuthNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Login" component={Login} />
			<Stack.Screen name="Register" component={Register} />
			{/* other auth screens */}
		</Stack.Navigator>
	);
}

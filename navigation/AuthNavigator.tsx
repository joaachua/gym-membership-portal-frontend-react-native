import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/Auth/Login"; // path to your Login screen
import Register from "../pages/Auth/Register";
import OtpScreen from "@/pages/Auth/SendOtp";

const Stack = createNativeStackNavigator();

export default function AuthNavigator({setHasAuthToken}) {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false, }}>
			<Stack.Screen name="Login">
				{(props) => (
					<Login {...props} setHasAuthToken={setHasAuthToken} />
				)} 
			</Stack.Screen>
			<Stack.Screen name="Register" component={Register} />
			<Stack.Screen name="OtpScreen">
				{(props) => (
					<OtpScreen {...props} setHasAuthToken={setHasAuthToken} />
				)} 
			</Stack.Screen>
			{/* other auth screens */}
		</Stack.Navigator>
	);
}

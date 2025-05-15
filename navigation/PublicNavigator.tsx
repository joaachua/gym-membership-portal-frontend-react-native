import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../pages/Onboarding/splashscreen";
import Onboarding from "../pages/Onboarding/carousel_content";

const Stack = createNativeStackNavigator();

export default function PublicNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Splash" component={SplashScreen} />
			<Stack.Screen name="Onboarding" component={Onboarding} />
		</Stack.Navigator>
	);
}

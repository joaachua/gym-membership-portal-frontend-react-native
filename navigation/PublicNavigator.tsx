import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "@/pages/Onboarding/splashscreen";
import Onboarding from "@/pages/Onboarding/carousel_content";

const Stack = createNativeStackNavigator();

export default function PublicNavigator({ setHasSeenOnboarding }) {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Splash">
				{(props) => (
					<SplashScreen {...props} setHasSeenOnboarding={setHasSeenOnboarding} />
				)}
			</Stack.Screen>
			<Stack.Screen name="Onboarding">
				{(props) => (
					<Onboarding {...props} setHasSeenOnboarding={setHasSeenOnboarding} />
				)}
			</Stack.Screen>
		</Stack.Navigator>
	);
}

import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import PublicNavigator from "./PublicNavigator";
import AuthNavigator from "./AuthNavigator";
import ProtectedNavigator from "./ProtectedNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AppNavigator() {
	const [isLoading, setIsLoading] = useState(true);
	const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false); // We'll check for token

	useEffect(() => {
		const loadState = async () => {
			// Check if user has seen the onboarding
			const seen = await AsyncStorage.getItem("hasSeenOnboarding");
			setHasSeenOnboarding(seen === "true");

			// Check if the user is logged in by verifying the token
			const token = await AsyncStorage.getItem("auth_token");
			setIsLoggedIn(!!token); // true if there's a valid token

			setIsLoading(false); // done loading, render navigation
		};

		loadState();
	}, []);

	if (isLoading) return null; // Show a splash screen or loading indicator

	return (
		<NavigationContainer>
			{/* Decide the route flow based on onboarding status and authentication */}
			{hasSeenOnboarding ? (
				isLoggedIn ? (
					<ProtectedNavigator />
				) : (
					<AuthNavigator />
				)
			) : (
				<PublicNavigator />
			)}
		</NavigationContainer>
	);
}

import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import PublicNavigator from "./PublicNavigator";
import AuthNavigator from "./AuthNavigator";
import ProtectedNavigator from "./ProtectedNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AppNavigator() {
	const [isLoading, setIsLoading] = useState(true);
	const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const loadState = async () => {
			const [seen, token] = await Promise.all([
				AsyncStorage.getItem("hasSeenOnboarding"),
				AsyncStorage.getItem("auth_token"),
			]);
	
			setHasSeenOnboarding(seen === "true");
			setIsLoggedIn(!!token);
			setIsLoading(false);
		};
	
		// Optional: add a minimal splash delay
		setTimeout(loadState, 500); // reduce delay from 1500ms to 500ms
	}, []);	

	if (isLoading) return null;

	return (
		<NavigationContainer>
			{hasSeenOnboarding ? (
				isLoggedIn ? (
					<ProtectedNavigator />
				) : (
					<AuthNavigator />
				)
			) : (
				<PublicNavigator setHasSeenOnboarding={setHasSeenOnboarding} />
			)}
		</NavigationContainer>
	);
}

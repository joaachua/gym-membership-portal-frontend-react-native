import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";

import PublicNavigator from "./PublicNavigator";
import AuthNavigator from "./AuthNavigator";
import ProtectedNavigator from "./ProtectedNavigator";

export default function AppNavigator() {
	const [isLoading, setIsLoading] = useState(true);
	const [hasAuthToken, setHasAuthToken] = useState(false);
	const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

	useEffect(() => {
		const loadState = async () => {
			const [seen, secureToken] = await Promise.all([
				AsyncStorage.getItem("hasSeenOnboarding"),
				SecureStore.getItemAsync("auth_token"), // more accurate than AsyncStorage fallback
			]);

			setHasSeenOnboarding(seen === "true");
			setHasAuthToken(!!secureToken); // fix: convert to boolean
			setIsLoading(false);

			console.log(`${seen} ${secureToken}`);
			console.log(`hasSeenOnboarding: ${seen === "true"}`);
			console.log(`hasAuthToken: ${!!secureToken}`);
		};
		setTimeout(loadState, 500);
	}, []);

	if (isLoading) return null;

	return (
		<NavigationContainer>
			{hasSeenOnboarding ? (
				hasAuthToken ? (
					<ProtectedNavigator setHasAuthToken={setHasAuthToken}/>
				) : (
					<AuthNavigator setHasAuthToken={setHasAuthToken} />
				)
			) : (
				<PublicNavigator setHasSeenOnboarding={setHasSeenOnboarding} />
			)}
		</NavigationContainer>
	);
}

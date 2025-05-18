import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigator from "./navigation/AppNavigator";
import Toast from "react-native-toast-message";
import toastConfig from "./pages/Components/Custom/CustomToast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import * as SystemUI from 'expo-system-ui';
import * as Font from 'expo-font';
import { StatusBar } from 'react-native';
import { ThemeProvider, useTheme } from "./styles/ThemeContext";

export default function App() {
	const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
	const [hasAuthToken, setHasAuthToken] = useState(false);
	const { theme, colors } = useTheme();

	useEffect(() => {
		SystemUI.setBackgroundColorAsync('#000');

		Font.loadAsync({
			'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
			'Roboto-SemiBold': require('./assets/fonts/Roboto-SemiBold.ttf'),
			'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
			'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
		});

		const loadState = async () => {
			const seen = await AsyncStorage.getItem("hasSeenOnboarding");
			const token = await AsyncStorage.getItem("hasAuthToken");

			//await AsyncStorage.setItem("hasSeenOnboarding", "false");
			//await AsyncStorage.setItem("hasAuthToken", "false");
			//await SecureStore.deleteItemAsync("auth_token");
			console.log(`${seen} ${token}`);

			console.log("Current theme:", theme);
		};

		loadState();
	}, []);

	return (
		<ThemeProvider>
			<SafeAreaProvider>
				<StatusBar backgroundColor="#E38035" barStyle="light-content" />
				<AppNavigator />
				<Toast config={toastConfig} />
			</SafeAreaProvider>
		</ThemeProvider>
	);
}

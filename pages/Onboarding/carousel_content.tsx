import React, { useContext } from "react";
import { View, Text, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";

export default function Onboarding({ navigation }) {
	const { theme } = useContext(ThemeContext);
	const styles = getGlobalStyles(theme);

	const handleFinishOnboarding = async () => {
		await AsyncStorage.setItem("hasSeenOnboarding", "true");
		navigation.replace("Login"); // or Register
	};

	return (
		<View style={styles.onboarding}>
			<Text>Welcome to the Onboarding Carousel</Text>
			<Button title="Get Started" onPress={handleFinishOnboarding} />
		</View>
	);
}

import React, { useContext, useEffect } from "react";
import { ImageBackground, View, ActivityIndicator, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";

export default function SplashScreen({ navigation, setHasSeenOnboarding }) {
	const { theme } = useContext(ThemeContext);
	const styles = getGlobalStyles(theme);

	useEffect(() => {
		const checkFirstLaunch = async () => {
			const seen = await AsyncStorage.getItem("hasSeenOnboarding");

			if (seen === "true") {
				navigation.replace("Login"); // or your main auth screen
			} else {
				navigation.replace("Onboarding");
			}
		};

		const timer = setTimeout(() => {
			checkFirstLaunch();
		}, 1500); // 1.5 seconds delay

		return () => clearTimeout(timer); // cleanup if component unmounts
	}, []);

	return (
		<ImageBackground
			source={require("../../assets/img/bg-Splash-screen-v1.png")}
			style={styles.background}
			resizeMode="cover"
		>
			<View style={styles.splashscreen}>
				<Image
					source={require("../../assets/img/img-Splash-screen.png")}
					style={styles.logo}
					resizeMode="contain"
				/>
				<ActivityIndicator size="large" color="#ffffff" />
			</View>
		</ImageBackground>
	);
}

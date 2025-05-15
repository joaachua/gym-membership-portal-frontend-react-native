import React, { useContext, useEffect, useState } from "react";
import { ImageBackground, View, ActivityIndicator, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";

export default function SplashScreen({ navigation }) {
	const { theme } = useContext(ThemeContext);
	const styles = getGlobalStyles(theme);

	useEffect(() => {
		const checkFirstLaunch = async () => {
			const hasSeenOnboarding = await AsyncStorage.getItem("hasSeenOnboarding");
			if (hasSeenOnboarding === null) {
				navigation.replace("Onboarding");
			} else {
				navigation.replace("Login"); // or Register
			}
		};

		setTimeout(checkFirstLaunch, 1500); // mimic splash delay
	}, []);

	return (
        <ImageBackground
            source={require('../../assets/img/bg-Splash-screen.png')} // or use a URL
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.splashscreen}>
                <Image
                    source={require('../../assets/img/img-Splash-screen.png')}
                    style={styles.logo}
                    resizeMode="contain"            
                />
                <ActivityIndicator size="large" />
            </View>
        </ImageBackground>
	);
}

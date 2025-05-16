import React, { useContext } from "react";
import {
	View,
	Text,
	ImageBackground,
	useWindowDimensions,
	StyleSheet,
} from "react-native";
import { ThemeContext, useTheme } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingItem({ item, navigation }) {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);
	const { width, height } = useWindowDimensions();

	return (
		<View style={{ width, height }}>
			<ImageBackground
				source={item.image}
				style={[StyleSheet.absoluteFillObject, { width, height }]}
				resizeMode="cover"
			>
				{/* Overlay for modal-like text at bottom */}
				<SafeAreaView style={[styles.overlayContainer, { width }]}>
					<Text style={styles.title}>{item.title}</Text>
					<Text style={[styles.description, { paddingBottom: 50 }]}>{item.description}</Text>
				</SafeAreaView>
			</ImageBackground>
		</View>
	);
}

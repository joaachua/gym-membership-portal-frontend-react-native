// screens/ThemePreview.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { colors } from "../styles/themes";

const ThemePreview = ({ theme = "light" }: { theme?: "light" | "dark" }) => {
	const selectedTheme = colors[theme];

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{Object.entries(selectedTheme).map(([key, value]) => (
				<View key={key} style={[styles.colorBox, { backgroundColor: value }]}>
					<Text
						style={[
							styles.label,
							{ color: theme === "dark" ? "#fff" : "#000" },
						]}
					>
						{key}: {value}
					</Text>
				</View>
			))}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	colorBox: {
		padding: 20,
		borderRadius: 10,
		marginBottom: 12,
	},
	label: {
		fontWeight: "600",
	},
});

export default ThemePreview;

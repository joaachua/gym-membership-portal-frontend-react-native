import { StyleSheet } from "react-native";
import { colors } from "./themes";

export const getGlobalStyles = (theme: "light" | "dark") =>
	StyleSheet.create({
		splashscreen: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},

		background: {
			flex: 1,
			width: '100%',
			height: '100%',
			justifyContent: 'center',
		},

		logo: {
			width: 200,
			height: 200,
			marginBottom: 40,
		  },

		onboarding: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},

		scrollview: {
			flex: 1
		},

		container: {
			padding: 16,
			backgroundColor: colors[theme].background,
			flex: 1,
		},
		input: {
			borderWidth: 1,
			borderColor: colors[theme].accent,
			color: colors[theme].bodyText,
			padding: 10,
			marginVertical: 8,
			borderRadius: 4,
		},
		dropdown: {
			height: 40,
			paddingTop: 8,
			paddingLeft: 2,
			borderWidth: 1,
			borderRadius: 4,
			borderColor: colors[theme].accent,
			width: "100%", // Ensures the dropdown takes the full width of its container
		},
		dropdownText: {
			fontSize: 16,
			paddingLeft: 8,
		},
		dropdownMenu: {
			borderRadius: 4,
			backgroundColor: "#fff",
			minWidth: "90%", // Ensures the dropdown menu is as wide as the container
			width: "auto", // Adjusts the dropdown width based on the content but ensures it’s not too small
			marginTop: 4, // Adjusts gap between the dropdown and menu
		},
		dropdownMenuText: {
			fontSize: 16,
			padding: 8,
			width: "90%", // Ensures the text inside the dropdown is fully aligned
		},
		button: {
			backgroundColor: colors[theme].accent,
			padding: 12,
			borderRadius: 6,
			alignItems: "center",
			marginVertical: 8,
		},
		buttonText: {
			color: colors[theme].buttonText,
			fontWeight: "bold",
		},
		link: {
			color: colors[theme].accent,
			fontWeight: "bold",
		},
		label: {
			color: colors[theme].bodyText,
			marginTop: 8,
		},
	});

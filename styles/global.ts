import { StyleSheet } from "react-native";
import { colors } from "./themes";

export const getGlobalStyles = (theme: "light" | "dark") =>
	StyleSheet.create({
		//Global
		safeArea: {
			flex: 1,
			backgroundColor: '#fff',
		},

		scrollContent: {
			flexGrow: 1,
		},

		scrollview: {
			flex: 1,
		},

		view: {
			flex: 1
		},

		container: {
			padding: 16,
			borderTopLeftRadius: 24,
			borderTopRightRadius: 24,
			backgroundColor: colors[theme].background,
			marginTop: -30,
			flex: 1,
		},
		
		input: {
			height: 50,
			borderWidth: 1,
			borderColor: colors[theme].accent,
			color: colors[theme].bodyText,
			paddingRight: 20,
			paddingLeft: 20,
			padding: 10,
			marginVertical: 8,
			borderRadius: 50,
		},

		title: {
			fontWeight: 700,
			fontSize: 28,
			marginBottom: 10,
			color: colors[theme].accent,
			textAlign: 'center'
		},

		description: {
			fontWeight: 400,
			fontSize: 16,
			color: colors[theme].secondary,
			textAlign: 'center',
			paddingHorizontal: 64
		},

		primaryButton: {
			backgroundColor: colors[theme].accent,
			paddingVertical: 6,
			paddingHorizontal: 14,
			borderRadius: 50,
			height: 50,
			justifyContent: 'center',
			alignItems: 'center'
		},

		primaryButtonText: { 
			color: colors[theme].primary, 
			fontWeight: "bold" ,
			fontSize: 16,
		},

		secondaryButton: {
			backgroundColor: colors[theme].primary,
			paddingVertical: 6,
			paddingHorizontal: 14,
			borderRadius: 20,
		},

		secondaryButtonText: { 
			color: colors[theme].accent, 
			fontWeight: "bold" 
		},

		hoveringRightButton: {
			position: "absolute",
			top: 50,
			right: 20,
			zIndex: 1,
			backgroundColor: colors[theme].primary,
			paddingVertical: 6,
			paddingHorizontal: 14,
			borderRadius: 20,
		},

		hoveringRightButtonText: { 
			color: colors[theme].accent, 
			fontWeight: "bold" 
		},

		shadowButton: {
			position: "absolute",
			bottom: 60,
			alignSelf: "center",
			backgroundColor: colors[theme].primary,
			paddingVertical: 12,
			paddingHorizontal: 24,
			borderRadius: 25,
			elevation: 3,
		},

		shadowButtonText: { 
			color: colors[theme].accent, 
			fontWeight: "bold" 
		},

		//splash screen
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

		// onboarding carousel
		onboarding: {
			flexDirection: "row", 
			justifyContent: "center", 
			marginTop: 16
		},

		image: {
			flex: 0.7,
			justifyContent: 'center',
		},

		carousel_item: {
			height: 10,
			width: 10,
			borderRadius: "50%",
			marginHorizontal: 4,
		},

		onboarding_item: {
			flex: 0.3
		},

		overlayContainer: {
			position: "absolute",
			bottom: 0,
			width: "100%",
			padding: 24,
			borderTopLeftRadius: 30,
			borderTopRightRadius: 30,
			backgroundColor: colors[theme].primary,
			zIndex: 10,
		},

		pagination: {
			flexDirection: "row",
			justifyContent: "center",
			marginBottom: 20,
		},

		//Login/Register
		banner: {
			width: '100%',
			height: 300,
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

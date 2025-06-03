import { StyleSheet } from "react-native";
import { colors } from "./themes";

export const getGlobalStyles = (theme: "light" | "dark") =>
	StyleSheet.create({
		//Global
		safeArea: {
			flex: 1,
			backgroundColor: colors[theme].primary,
		},

		scrollContent: {
			flexGrow: 1,
			paddingBottom: 60,
		},

		scrollview: {
			flex: 1,
		},

		view: {
			backgroundColor: colors[theme].primary,
			flex: 1,
		},

		section: {
			marginBottom: 20,
		},

		mainContent: {
			flex: 1,
			padding: 20,
		},

		searchBar: {
			height: 50,
			borderRadius: 50,
			paddingHorizontal: 20,
			backgroundColor: colors[theme].formatted,
			marginBottom: 16,
		},

		container: {
			paddingTop: 24,
			padding: 16,
			borderTopLeftRadius: 24,
			borderTopRightRadius: 24,
			backgroundColor: colors[theme].background,
			marginTop: -30,
			flex: 1,
		},

		content: {
			flex: 1,
			padding: 24,
			justifyContent: "center",
			backgroundColor: "#fff",
		},

		cards: {
			backgroundColor: colors[theme].formatted,
			borderRadius: 16,
			padding: 24,
		},

		cardContent: {
			color: colors[theme].bodyText,
			fontFamily: "Roboto-Regular",
		},

		bottomNav: {
			position: "absolute",
			bottom: 0,
			left: 0,
			right: 0,
			height: 80,
			flexDirection: "row",
			justifyContent: "space-around",
			alignItems: "center",
			borderTopEndRadius: 16,
			borderTopStartRadius: 16,
			//borderTopWidth: 1,
			//borderColor: "#ddd",
			backgroundColor: colors[theme].accent,
		},

		navItem: {
			fontSize: 16,
		},

		input: {
			fontFamily: "Roboto-Regular",
			height: 50,
			backgroundColor: colors[theme].formatted,
			color: colors[theme].bodyText,
			paddingRight: 20,
			paddingLeft: 20,
			padding: 10,
			marginVertical: 8,
			borderRadius: 50,
		},

		checkboxContainer: {
			marginBottom: 10,
			marginTop: 10,
			flexDirection: "row",
			alignItems: "center",
		},

		checkbox: {
			display: "flex",
			width: 20,
			height: 20,
			borderWidth: 1,
			borderColor: "#999",
			marginRight: 10,
			justifyContent: "center",
			alignContent: "center",
			alignItems: "center",
		},

		checked: {
			backgroundColor: "#007AFF",
		},

		title: {
			fontFamily: "Roboto-Bold",
			fontSize: 28,
			marginBottom: 10,
			color: colors[theme].accent,
			textAlign: "center",
		},

		description: {
			fontFamily: "Roboto-Regular",
			fontSize: 16,
			color: colors[theme].bodyText,
			textAlign: "center",
			paddingHorizontal: 64,
		},

		bodyText: {
			color: colors[theme].bodyText,
			fontFamily: "Roboto-Regular",
		},

		primaryButton: {
			backgroundColor: colors[theme].accent,
			paddingVertical: 6,
			paddingHorizontal: 14,
			borderRadius: 50,
			height: 50,
			justifyContent: "center",
			alignItems: "center",
		},

		primaryButtonText: {
			color: colors[theme].buttonText,
			fontFamily: "Roboto-Bold",
			fontSize: 16,
		},

		outlinePrimaryButton: {
			backgroundColor: colors[theme].primary,
			paddingVertical: 6,
			paddingHorizontal: 14,
			borderRadius: 50,
			height: 50,
			justifyContent: "center",
			alignItems: "center",
		},

		outlinePrimaryButtonText: {
			color: colors[theme].accent,
			fontFamily: "Roboto-Bold",
			fontSize: 16,
		},

		secondaryButton: {
			backgroundColor: colors[theme].accent,
			paddingVertical: 6,
			paddingHorizontal: 14,
			borderRadius: 20,
		},

		secondaryButtonText: {
			color: colors[theme].buttonText,
			fontFamily: "Roboto-Bold",
		},

		blocks: {
			height: 50,
			backgroundColor: colors[theme].primary,
			paddingVertical: 10,
		},

		hoveringRightButton: {
			position: "absolute",
			top: 50,
			right: 20,
			zIndex: 1,
			backgroundColor: colors[theme].accent,
			paddingVertical: 6,
			paddingHorizontal: 14,
			borderRadius: 20,
		},

		hoveringRightButtonText: {
			color: colors[theme].buttonText,
			fontFamily: "Roboto-Bold",
		},

		shadowButton: {
			position: "absolute",
			bottom: 60,
			alignSelf: "center",
			backgroundColor: colors[theme].accent,
			paddingVertical: 12,
			paddingHorizontal: 24,
			borderRadius: 25,
			elevation: 3,
		},

		shadowButtonText: {
			color: colors[theme].buttonText,
			fontFamily: "Roboto-Bold",
		},

		toastContainer: {
			flexDirection: "column",
			justifyContent: "center",
			width: "90%",
			minHeight: 52,
			padding: 12,
			borderRadius: 8,
			backgroundColor: "#FEF3F2",
			marginVertical: 8,
			borderWidth: 1,
		},

		errorBorder: {
			borderColor: "#D92D20",
			backgroundColor: "#FEF3F2",
		},

		successBorder: {
			borderColor: "#ABEFC6",
			backgroundColor: "#ECFDF3",
		},

		errorText: {
			color: "#D92D20",
			fontSize: 12,
			fontFamily: "Roboto-SemiBold",
		},

		successText: {
			color: "#067647",
			fontSize: 12,
			fontFamily: "Roboto-SemiBold",
		},

		subText: {
			color: "#000",
			fontSize: 10,
			marginTop: 2,
		},

		dropDown: {
			flexDirection: "row",
			alignItems: "center",
			gap: 8,
		},

		dropDownItem: {
			position: "absolute",
			top: 55,
			width: "100%",
			backgroundColor: colors[theme].primary,
			borderColor: "#ccc",
			color: colors[theme].buttonText,
			borderRadius: 24,
			zIndex: 10,
		},

		grid: {
			flexDirection: "row",
			flexWrap: "wrap",
			justifyContent: "space-between",
			gap: 12,
		},

		card: {
			width: "30%",
			aspectRatio: 1,
			backgroundColor: "#f5f5f5",
			borderRadius: 12,
			alignItems: "center",
			justifyContent: "center",
			padding: 10,
		},

		cardLabel: {
			marginTop: 8,
			fontSize: 14,
			fontFamily: "Roboto-SemiBold",
			color: colors[theme].bodyText,
		},

		modalOverlay: {
			flex: 1,
			backgroundColor: colors[theme].formatted,
			justifyContent: "center",
			alignItems: "center",
		},

		modalContent: {
			backgroundColor: colors[theme].background,
			paddingVertical: 40,
			paddingHorizontal: 20,
			borderRadius: 24,
			width: "80%",
			alignItems: "center",
		},

		modalText: {
			fontSize: 16,
			marginBottom: 20,
			textAlign: "center",
		},

		modalActions: {
			flexDirection: "row",
			justifyContent: "space-between",
			width: "100%",
		},

		confirmButton: {
			backgroundColor: colors[theme].accent,
			borderRadius: 50,
			height: 50,
			flex: 1,
			marginRight: 10,
			alignItems: "center",
			justifyContent: "center",
		},

		cancelButton: {
			backgroundColor: colors[theme].primary,
			borderRadius: 50,
			height: 50,
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
		},

		buttonText: {
			color: colors[theme].buttonText,
			fontWeight: "bold",
		},

		//splash screen
		splashscreen: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},

		background: {
			flex: 1,
			width: "100%",
			height: "100%",
			justifyContent: "center",
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
			marginTop: 16,
		},

		image: {
			flex: 0.7,
			justifyContent: "center",
		},

		carousel_item: {
			height: 10,
			width: 10,
			borderRadius: "50%",
			marginHorizontal: 4,
		},

		onboarding_item: {
			flex: 0.3,
		},

		overlayContainer: {
			position: "absolute",
			bottom: 0,
			width: "100%",
			padding: 24,
			height: "30%",
			borderTopLeftRadius: 30,
			borderTopRightRadius: 30,
			backgroundColor: colors[theme].primary,
			zIndex: 10,
		},

		pagination: {
			flexDirection: "row",
			justifyContent: "center",
			backgroundColor: colors[theme].primary,
			marginBottom: 20,
		},

		//Login/Register
		banner: {
			width: "100%",
			height: 300,
		},

		//Home
		homeCarouselBanner: {
			borderRadius: 24,
			width: "100%",
			height: 200,
		},

		greeting: {
			fontSize: 18,
			fontFamily: "Roboto-SemiBold",
			color: colors[theme].bodyText,
		},

		sectionTitle: {
			fontSize: 16,
			fontFamily: "Roboto-SemiBold",
			marginBottom: 8,
			color: colors[theme].bodyText,
			textTransform: "uppercase",
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
			fontFamily: "Roboto-Bold",
		},
		link: {
			color: colors[theme].accent,
			fontFamily: "Roboto-Bold",
		},
		label: {
			color: colors[theme].bodyText,
		},

		centreCard: {
			backgroundColor: "#fff",
			borderRadius: 16,
			marginRight: 16,
			marginBottom: 20,
			overflow: "hidden",
			width: 280,
			shadowColor: "#000",
			shadowOpacity: 0.1,
			shadowRadius: 4,
			elevation: 4,
		},

		centreImage: {
			width: "100%",
			height: 140,
		},

		centreContent: {
			padding: 12,
		},

		centreName: {
			fontSize: 18,
			fontWeight: "bold",
			marginBottom: 4,
		},

		centreLocation: {
			fontSize: 14,
			color: "#666",
			marginBottom: 8,
		},

		subheading: {
			fontWeight: "600",
			marginTop: 8,
			marginBottom: 4,
		},

		schedule: {
			fontSize: 12,
			color: "#444",
		},

		tagContainer: {
			flexDirection: "row",
			flexWrap: "wrap",
			gap: 6,
			marginTop: 4,
		},

		tag: {
			backgroundColor: colors[theme].accent,
			color: "#fff",
			paddingHorizontal: 8,
			paddingVertical: 4,
			borderRadius: 12,
			fontSize: 12,
			marginRight: 6,
			marginBottom: 6,
		},

		name: {
			fontSize: 20,
			fontWeight: "bold",
		},

		location: {
			fontSize: 14,
			color: "#555",
			marginBottom: 8,
		},

		horizontalCard: {
			backgroundColor: "#fff",
			padding: 16,
			borderRadius: 12,
			marginRight: 12,
			width: 200,
			elevation: 3,
			shadowColor: "#000",
			shadowOpacity: 0.1,
			shadowOffset: { width: 0, height: 2 },
			shadowRadius: 4,
		},

		cardTitle: {
			fontSize: 16,
			fontWeight: "600",
			marginBottom: 4,
		},

		cardSubtitle: {
			fontSize: 13,
			color: "#666",
		},

		achievementCard: {
			backgroundColor: "#f8f8f8",
			padding: 15,
			borderRadius: 12,
			marginRight: 10,
			width: 150,
			alignItems: "center",
			shadowColor: "#000",
			shadowOpacity: 0.1,
			shadowOffset: { width: 0, height: 1 },
			shadowRadius: 3,
			elevation: 2,
		},
		achievementIcon: {
			fontSize: 32,
			marginBottom: 10,
		},
		achievementTitle: {
			fontWeight: "bold",
			fontSize: 14,
			textAlign: "center",
		},
		achievementProgress: {
			fontSize: 12,
			marginTop: 5,
			color: "#555",
		},
	});

import React, { useContext, useEffect, useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image, ScrollView, ImageBackground } from "react-native";
import { ThemeContext, useTheme } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";
import { getProfile } from "../../services/api";
import * as SecureStore from 'expo-secure-store';
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import CustomNavBar from "../Components/Custom/CustomNavBar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Home = ({ navigation, setHasAuthToken }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);
	const [profile, setProfile] = useState(null);

    useEffect(() => {
		const checkToken = async () => {
			try {
				const token = await SecureStore.getItemAsync("auth_token");
				if (!token) {

					await SecureStore.deleteItemAsync("auth_token");
					setHasAuthToken(false);
					throw new Error("Token missing");
				}

				const response = await getProfile(token); // e.g. GET /me
				if (response && response.success) {
					setProfile(response.data);
				}
			} catch (error) {				
				const errorMessages = error.response?.data?.data;

				if (Array.isArray(errorMessages) && errorMessages.length > 0) {
					// Join all messages separated by newline or comma
					const messages = errorMessages.map((e: any) => e.message).join(", ");
					Toast.show({ type: "error", text1: messages });
				} else if (error.response?.data?.message) {
					Toast.show({ type: "error", text1: error.response.data.message });
				} else if (error?.response?.data?.message === "Failed to authenticate token") {
					Toast.show({ type: "error", text1: error?.response?.data?.message });
					await SecureStore.deleteItemAsync("auth_token");
					setHasAuthToken(false);
				}
			}
		};

		checkToken();
	}, []);

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.mainContent}>
					{/* Section 1: Search + Greeting */}
					<View style={styles.section}>
						<TextInput
							placeholder="Search..."
							style={styles.searchBar}
							editable={false}
						/>
						<Text style={styles.greeting}>Hello{profile && profile.salutation && profile.full_name ? `, ${profile.salutation} ${profile.full_name}` : ""} 👋</Text>
					</View>

					{/* Section 2: Shortcuts + Banner */}
					<Image
						source={require('../../assets/img/auth-img-banner.jpg')} // Replace with your banner path
						style={[styles.homeCarouselBanner, { marginBottom: 20 }]}
						resizeMode="cover"
					/>

					<View style={[styles.section, {marginBottom: 0}]}>
						<Text style={styles.sectionTitle}>Shortcuts</Text>
						<View style={styles.grid}>
							<TouchableOpacity style={styles.card} onPress={() => navigation.navigate("GenerateWorkout")}>
								<Icon name={"calendar"} size={36} color="#E38035" />
								<Text style={styles.cardLabel}>Workout</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.card} onPress={() => navigation.navigate("")}>
								<Icon name={"food-drumstick"} size={36} color="#E38035" />
								<Text style={styles.cardLabel}>Meals</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.card} onPress={() => navigation.navigate("WorkoutLog")}>
								<Icon name={"chart-line"} size={36} color="#E38035" />
								<Text style={styles.cardLabel}>Progress</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.card} onPress={() => navigation.navigate("")}>
								<Icon name={"account-group"} size={36} color="#E38035" />
								<Text style={styles.cardLabel}>Classes</Text>
							</TouchableOpacity>
						</View>
					</View>

					{/* Section 3: Popular workouts */}
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Popular Workouts</Text>
						<View style={styles.cards}>
							<Text style={styles.cardContent}>📅 Workout</Text>
							<Text style={styles.cardContent}>🍎 Nutrition</Text>
							<Text style={styles.cardContent}>📊 Progress</Text>
						</View>
					</View>

					{/* Section 4: Classes */}
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Classes</Text>
						<View style={styles.cards}>
							<Text style={styles.cardContent}>📅 Workout</Text>
							<Text style={styles.cardContent}>🍎 Nutrition</Text>
							<Text style={styles.cardContent}>📊 Progress</Text>
						</View>
					</View>

					{/* Section 5: Events */}
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Events</Text>
						<View style={styles.cards}>
							<Text style={styles.cardContent}>📅 Workout</Text>
							<Text style={styles.cardContent}>🍎 Nutrition</Text>
							<Text style={styles.cardContent}>📊 Progress</Text>
						</View>
					</View>
				</View>
			</ScrollView>

			<CustomNavBar navigation={navigation}/>
		</SafeAreaView>
	);
};

export default Home;
import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Alert,
	StyleSheet,
	TouchableOpacity,
	Image,
	ScrollView,
	ImageBackground,
} from "react-native";
import { ThemeContext, useTheme } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";
import { getProfile, getClassList, getCentreList } from "../../services/api";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import CustomNavBar from "../Components/Custom/CustomNavBar";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Home = ({ navigation, setHasAuthToken }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);
	const [profile, setProfile] = useState(null);
	const [classList, setClassList] = useState(null);
	const [centreList, setCentreList] = useState(null);

	const popularWorkouts = [
		{
			id: 1,
			title: "Full Body Burn",
			description: "A 30-minute HIIT routine to activate all muscle groups.",
			emoji: "🔥",
		},
		{
			id: 2,
			title: "Core Crusher",
			description: "Strengthen your abs with this 15-minute core workout.",
			emoji: "💪",
		},
		{
			id: 3,
			title: "Cardio Blast",
			description: "Boost endurance with this fast-paced cardio session.",
			emoji: "🏃‍♂️",
		},
	];	

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

				const class_response = await getClassList(token);
				if (class_response && class_response.success) {
					setClassList(class_response.data);
				}

				const centre_response = await getCentreList(token);
				if (centre_response && centre_response.success) {
					setCentreList(centre_response.data);
				}
			} catch (error) {
				const errorMessages = error.response?.data?.data;

				if (Array.isArray(errorMessages) && errorMessages.length > 0) {
					// Join all messages separated by newline or comma
					const messages = errorMessages.map((e: any) => e.message).join(", ");
					Toast.show({ type: "error", text1: messages });
				} else if (
					error?.response?.data?.message === "Failed to authenticate token"
				) {
					Toast.show({ type: "error", text1: error?.response?.data?.message });
					await SecureStore.deleteItemAsync("auth_token");
					setHasAuthToken(false);
				} else if (error.response?.data?.message) {
					Toast.show({ type: "error", text1: error.response.data.message });
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
						<Text style={styles.greeting}>
							Hello
							{profile && profile.salutation && profile.full_name
								? `, ${profile.salutation} ${profile.full_name}`
								: ""}{" "}
							👋
						</Text>
					</View>

					{/* Section 2: Shortcuts + Banner */}
					<Image
						source={require("../../assets/img/auth-img-banner.jpg")} // Replace with your banner path
						style={[styles.homeCarouselBanner, { marginBottom: 20 }]}
						resizeMode="cover"
					/>

					<View style={[styles.section, { marginBottom: 0 }]}>
						<Text style={styles.sectionTitle}>Shortcuts</Text>
						<View style={styles.grid}>
							<TouchableOpacity
								style={styles.card}
								onPress={() => navigation.navigate("GenerateWorkout")}
							>
								<Icon name={"calendar"} size={36} color="#E38035" />
								<Text style={styles.cardLabel}>Workout</Text>
							</TouchableOpacity>
							{/*<TouchableOpacity
								style={styles.card}
								onPress={() => navigation.navigate("")}
							>
								<Icon name={"food-drumstick"} size={36} color="#E38035" />
								<Text style={styles.cardLabel}>Meals</Text>
							</TouchableOpacity>*/}
							<TouchableOpacity
								style={styles.card}
								onPress={() => navigation.navigate("WorkoutLog")}
							>
								<Icon name={"chart-line"} size={36} color="#E38035" />
								<Text style={styles.cardLabel}>Progress</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.card}
								onPress={() => navigation.navigate("RegisterClassList")}
							>
								<Icon name={"account-group"} size={36} color="#E38035" />
								<Text style={styles.cardLabel}>Classes</Text>
							</TouchableOpacity>
						</View>
					</View>

					{/* Section 3: Classes */}
					{classList && classList.data && 
					<>
						<Text style={styles.sectionTitle}>Centres</Text>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{classList.data.map((c) => (
								<TouchableOpacity
									key={c.id}
									style={styles.centreCard}
									onPress={() => navigation.navigate("ViewClass", { classId: c.id })}
								>
									<Image
										source={{ uri: c.featured_img }}
										style={styles.centreImage}
									/>
									<View style={styles.centreContent}>
										<Text style={styles.centreName}>{c.title}</Text>

										<Text style={styles.subheading}>🕒 Schedule:</Text>
										{c.schedules.slice(0, 3).map((s, idx) => (
											<Text key={idx} style={styles.schedule}>
												{s.day_of_week}: {s.start_time} - {s.end_time}
											</Text>
										))}

										{c.schedules.length > 3 && (
											<Text style={styles.schedule}>...and more</Text>
										)}
									</View>
								</TouchableOpacity>
							))}
						</ScrollView>
					</>
					}

					{/* Section 4: Centres */}
					{centreList && centreList.data && 
					<>
						<Text style={styles.sectionTitle}>Centres</Text>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{centreList.data.map((centre) => (
								<TouchableOpacity
									key={centre.id}
									style={styles.centreCard}
									onPress={() => navigation.navigate("ViewCentre", { centreId: centre.id })}
								>
									<Image
										source={{ uri: centre.featured_img }}
										style={styles.centreImage}
									/>
									<View style={styles.centreContent}>
										<Text style={styles.centreName}>{centre.name}</Text>
										<Text style={styles.centreLocation}>
											📍 {centre.location}
										</Text>

										<Text style={styles.subheading}>🕒 Schedule:</Text>
										{centre.schedules.slice(0, 3).map((s, idx) => (
											<Text key={idx} style={styles.schedule}>
												{s.day_of_week}: {s.start_time} - {s.end_time}
											</Text>
										))}
										{centre.schedules.length > 3 && (
											<Text style={styles.schedule}>...and more</Text>
										)}

										<Text style={styles.subheading}>🏷️ Tags:</Text>
										<View style={styles.tagContainer}>
											{centre.tags.map((t, index) => (
												<Text key={index} style={styles.tag}>
													#{t.tag}
												</Text>
											))}
										</View>
									</View>
								</TouchableOpacity>
							))}
						</ScrollView>
					</>
					}

					{/* Section 5: Popular workouts */}
					<View style={styles.section}>
						<Text style={styles.sectionTitle}>Popular Workouts</Text>
						<ScrollView horizontal showsHorizontalScrollIndicator={false}>
							{popularWorkouts.map((workout) => (
								<View key={workout.id} style={[styles.horizontalCard, { marginBottom: 10 }]}>
									<Text style={styles.cardTitle}>{workout.emoji} {workout.title}</Text>
									<Text style={styles.cardSubtitle}>{workout.description}</Text>
								</View>
							))}
						</ScrollView>
					</View>
				</View>
			</ScrollView>

			<CustomNavBar navigation={navigation} />
		</SafeAreaView>
	);
};

export default Home;

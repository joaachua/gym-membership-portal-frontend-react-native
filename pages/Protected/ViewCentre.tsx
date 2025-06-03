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
	Modal,
} from "react-native";
import { ThemeContext, useTheme } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";
import { getProfile, getCentreDetails } from "../../services/api";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomNavBar from "../Components/Custom/CustomNavBar";
import { colors } from "@/styles/themes";
import MCIcon from "react-native-vector-icons/MaterialCommunityIcons";

const ViewCentre = ({ route, navigation, setHasAuthToken }) => {
	const { centreId } = route.params;
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);
	const [profile, setProfile] = useState(null);
	const [centre, setCentre] = useState(null);

	const [authToken, setAuthToken] = useState("");

	useEffect(() => {
		const checkToken = async () => {
			try {
				const token = await SecureStore.getItemAsync("auth_token");
				if (!token) {
					await SecureStore.deleteItemAsync("auth_token");
					setHasAuthToken(false);
					throw new Error("Token missing");
				}

				setAuthToken(token);
				const response = await getProfile(token); // e.g. GET /me
				if (response && response.success) {
					setProfile(response.data);
				}

				const view_centre = await getCentreDetails(token, {
					id: centreId,
				});
				setCentre(view_centre.data);
				console.log(view_centre.data);
			} catch (error) {
				Toast.show({ type: "error", text1: "Session expired" });
				await SecureStore.deleteItemAsync("auth_token");
				setHasAuthToken(false);
				navigation.replace("Login"); // ensure 'Login' is in your AuthNavigator
			}
		};

		checkToken();
	}, []);

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.mainContent}>
					<View style={styles.section}>
						<Text style={[styles.greeting, { marginBottom: 15 }]}>
							Centre Details
						</Text>

                        {centre && centre.featured_img &&
                        <>
                            <Image
                                source={{ uri: centre.featured_img }}
                                style={styles.banner}
                                resizeMode="cover"
                            />

                            <View style={styles.content}>
                                <Text style={styles.title}>{centre.name}</Text>
                                <Text style={styles.location}>📍 {centre.location}</Text>

                                <Text style={styles.sectionTitle}>🕒 Schedule</Text>
                                {centre.centre_schedules.map((s, idx) => (
                                    <Text key={idx} style={styles.schedule}>
                                        {s.day_of_week}: {s.start_time} - {s.end_time}
                                    </Text>
                                ))}

                                <Text style={styles.sectionTitle}>🏷️ Tags</Text>
                                <View style={styles.tagContainer}>
                                    {centre.centre_tags.map((tag, idx) => (
                                        <Text key={idx} style={styles.tag}>
                                            #{tag.tag_name}
                                        </Text>
                                    ))}
                                </View>

                                <Text style={styles.sectionTitle}>📝 Description</Text>
                                <Text style={[styles.description, { paddingHorizontal: 5, textAlign: "left" }]}>
                                    {centre.description.replace(/<[^>]+>/g, "")}
                                </Text>
                            </View>
                        </>
                        }
					</View>
				</View>
			</ScrollView>

			<CustomNavBar navigation={navigation} />
		</SafeAreaView>
	);
};

export default ViewCentre;

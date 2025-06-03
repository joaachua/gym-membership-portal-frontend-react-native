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
import { getProfile, getClassDetails, registerClass } from "../../services/api";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import CustomNavBar from "../Components/Custom/CustomNavBar";
import { colors } from "@/styles/themes";

const ViewClass = ({ route, navigation, setHasAuthToken }) => {
	const { classId } = route.params;
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);
	const [profile, setProfile] = useState(null);
	const [singleClass, setClass] = useState(null);
	const [visible, setVisible] = useState(false);
	const [message, setMessage] = useState(false);

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

				const view_class = await getClassDetails(token, {
					id: classId,
				});
				setClass(view_class.data);
			} catch (error) {
				Toast.show({ type: "error", text1: "Session expired" });
				await SecureStore.deleteItemAsync("auth_token");
				setHasAuthToken(false);
				navigation.replace("Login"); // ensure 'Login' is in your AuthNavigator
			}
		};

		checkToken();
	}, []);

    const handleRegisterClass = async () => {
        try {
            const response = await registerClass(authToken, { class_id: classId });
            if (response && response.success) {
                setVisible(true);
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

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.mainContent}>
					<View style={styles.section}>
						<Text style={[styles.greeting, { marginBottom: 15 }]}>
							Class Details
						</Text>

                        {singleClass && singleClass.featured_img &&
                        <>
                            <Image
                                source={{ uri: singleClass.featured_img }}
                                style={styles.banner}
                                resizeMode="cover"
                            />

                            <View style={styles.content}>
                                <Text style={styles.title}>{singleClass.title}</Text>

                                <Text style={styles.sectionTitle}>🕒 Schedule</Text>
                                {singleClass.schedules.map((s, idx) => (
                                    <Text key={idx} style={styles.schedule}>
                                        {s.day_of_week}: {s.start_time} - {s.end_time}
                                    </Text>
                                ))}

                                <Text style={styles.sectionTitle}>📝 Description</Text>
                                <Text style={[styles.description, { paddingHorizontal: 5, textAlign: "left" }]}>
                                    {singleClass.description.replace(/<[^>]+>/g, "")}
                                </Text>
                            </View>

                            <TouchableOpacity
							    style={[styles.primaryButton, { marginBottom: 10, marginTop: 10 }]}
                                onPress={handleRegisterClass}
                            >
                                <Text style={styles.primaryButtonText}>Register Class</Text>
                            </TouchableOpacity>
                        </>
                        }
					</View>
				</View>
			</ScrollView>

            <Modal
				visible={visible}
				transparent
				animationType="fade"
				onRequestClose={() => setVisible(false)}
			>
				<View style={styles.modalOverlay}>
					<View style={styles.modalContent}>
						<Text style={styles.modalText}>You have registered for this class!</Text>
						<Text style={styles.modalText}>You will get back to you for an update. See you then~</Text>
						<View style={styles.modalActions}>
							<TouchableOpacity onPress={() => setVisible(false)} style={styles.cancelButton}>
								<Text style={[styles.buttonText, {color: colors[theme].accent}]}>Close</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>

			<CustomNavBar navigation={navigation} />
		</SafeAreaView>
	);
};

export default ViewClass;

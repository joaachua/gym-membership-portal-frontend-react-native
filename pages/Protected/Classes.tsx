import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import * as SecureStore from "expo-secure-store";
import { ThemeContext, useTheme } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";
import {
	logWorkout,
	calculateCalorie,
	logWorkoutList,
	viewLogWorkout,
	deleteLogWorkout,
	editLogWorkout,
	getRegisterClass,
} from "../../services/api";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "@/styles/themes";
import moment from "moment-timezone";

const RegisterClassList = ({ navigation, setHasAuthToken }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);
	const [authToken, setAuthToken] = useState("");

	const [list, setList] = useState(null);

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

				const response = await getRegisterClass(token);

				if (response.success) {
					setList(response.data);
					console.log(response.data);
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

	const fetchList = async () => {
		const response = await getRegisterClass(authToken);
		if (response.success) {
			setList(response.data);
		}
	};

	return (
		<>
			<SafeAreaView style={styles.safeArea}>
				<ScrollView contentContainerStyle={styles.scrollContent}>
					<View style={styles.mainContent}>
						<View style={styles.section}>
							<Text style={[styles.greeting, { marginBottom: 15 }]}>
								Your registered classes
							</Text>
							{list && list.length > 0 ? (
								list.map((item) => (
									<View
										key={item.id}
										style={{
											backgroundColor: "#fff",
											borderRadius: 10,
											marginBottom: 15,
											overflow: "hidden",
											shadowColor: "#000",
											shadowOpacity: 0.1,
											shadowOffset: { width: 0, height: 2 },
											shadowRadius: 4,
											elevation: 3,
										}}
									>
										<Image
											source={{ uri: item.featured_img }}
											style={{ width: "100%", height: 200 }}
											resizeMode="cover"
										/>
										<View style={{ padding: 15 }}>
											<Text
												style={{
													fontSize: 18,
													fontWeight: "bold",
													marginBottom: 8,
												}}
											>
												{item.title}
											</Text>
											<Text style={{ fontSize: 14, color: "#555" }}>
												{item.description.replace(/<[^>]+>/g, "").slice(0, 100)}
												...
											</Text>
										</View>
									</View>
								))
							) : (
								<Text
									style={{ textAlign: "center", marginTop: 20, color: "#888" }}
								>
									No classes found
								</Text>
							)}

							{/*logs.map((item) => (
                                <View key={item.id} style={styles.section}>
                                    <Text style={styles.label}>Exercise: {item.exercise}</Text>
                                    <Text style={styles.label}>Duration: {item.duration} min</Text>
                                    <Text style={styles.label}>Weight: {item.weight_kg} kg</Text>
                                    <Text style={styles.label}>Date: {moment.utc(item.date).tz("Asia/Kuala_Lumpur").format("YYYY-MM-DD")}</Text>
                                    <Text style={styles.label}>Calories: {item.calories_burned} kcal</Text>

                                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                                        <TouchableOpacity
                                            style={[styles.button]}
                                            onPress={() => handleEditClick(item.id)}
                                        >
                                            <Text style={styles.buttonText}>Edit</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            style={[styles.button, { marginLeft: 10 }]}
                                            onPress={() => {
                                                console.log(item.id);
                                                handleDeleteClick(item.id);
                                            }}
                                        >
                                            <Text style={styles.buttonText}>Delete</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))*/}
						</View>
					</View>
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

export default RegisterClassList;

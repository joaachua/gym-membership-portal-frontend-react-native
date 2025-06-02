import React, { useContext, useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Button,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
    Modal,
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
} from "../../services/api";
import Toast from "react-native-toast-message";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "@/styles/themes";
import moment from "moment-timezone";

const WorkoutLogList = ({ navigation, setHasAuthToken }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);
	const [authToken, setAuthToken] = useState("");

	const [loading, setLoading] = useState(false);
	const [editId, setEditId] = useState("");
	const [deleteId, setDeleteId] = useState("");
	const [isVisible, setIsVisible] = useState(false);
	const [isEditVisible, setIsEditVisible] = useState(false);
	const [log, setLog] = useState(null);
	const [logs, setLogsList] = useState([]);
    const [showExerciseDropdown, setShowExerciseDropdown] = useState(false);

    const exerciseOption = [
		"push-ups",
		"squats",
		"planks",
		"jumping jacks",
		"running",
		"cycling",
		"walking",
		"weight training",
		"hiit",
	];

	const [exercise, setExercise] = useState("push-ups");
	const [duration, setDuration] = useState("");
	const [weight, setWeight] = useState("");
    const [date, setDate] = useState("");
	const [calories, setCalories] = useState("");

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

				const response = await logWorkoutList(token);

				if (response.success) {
					setLogsList(response.data);
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

    const fetchLogs = async () => {
        const response = await logWorkoutList(authToken);
        if (response.success) {
            setLogsList(response.data);
        }
    };

    const handleExerciseDropdown = async () => {
		setShowExerciseDropdown((prev) => !prev);
	};

	const deleteFunction = async () => {
		try {
            const response = await deleteLogWorkout(authToken, { id: deleteId });

            if (response.success) {
                setIsVisible(false);
                Toast.show({ type: "success", text1: response.message });
                await fetchLogs();
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

	const editFunction = async () => {
		try {
            const response = await editLogWorkout(authToken, { 
                id: editId, 
                exercise, 
                duration, 
                weight_kg: weight, 
                date, 
                calories_burned: calories
             });

            if (response.success) {
                setIsEditVisible(false);
                Toast.show({ type: "success", text1: response.message });
                await fetchLogs();
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

    const resetEditForm = () => {
        setExercise("push-ups");
        setDuration("");
        setWeight("");
        setCalories("");
        setDate("");
    };

	const viewFunction = async (row_id) => {
		try {
			const response = await viewLogWorkout(authToken, { id: row_id });

			if (response.success) {
				setLog(response.data);
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

	const handleDeleteClick = (row_id) => {
		setDeleteId(row_id);
		setIsVisible(true);
	};

    const handleEditClick = async (row_id) => {
        setEditId(row_id);
        await viewFunction(row_id); // loads `log`
        
        if (log) {
            setExercise(log.exercise);
            setDuration(String(log.duration));
            setWeight(String(log.weight_kg));
            setCalories(String(log.calories_burned));
            setDate(new Date(log.date).toISOString().slice(0, 19).replace('T', ' '));
        }
    
        setIsEditVisible(true);
    };

	return (
		<>
			<SafeAreaView style={styles.safeArea}>
				<ScrollView contentContainerStyle={styles.scrollContent}>
					<View style={styles.mainContent}>
						<View style={styles.section}>
							<Text style={[styles.greeting, { marginBottom: 15 }]}>
								Your past workout history
							</Text>
                            {logs.map((item) => (
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
                            ))}
						</View>
					</View>
				</ScrollView>
                <Modal
                    visible={isEditVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => {
                        resetEditForm();
                        setIsEditVisible(false);
                    }}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Edit Workout Log</Text>
                            <View style={styles.section}>
                                <View style={styles.dropDown}>
                                    <View style={{ flex: 1 }}>
                                        <TouchableOpacity
                                            style={[
                                                styles.input,
                                                {
                                                    height: 50,
                                                    justifyContent: "space-between",
                                                    flexDirection: "row",
                                                    alignItems: "center",
                                                    paddingHorizontal: 10,
                                                },
                                            ]}
                                            onPress={handleExerciseDropdown}
                                        >
                                            <Text
                                                style={[
                                                    styles.bodyText,
                                                    {
                                                        width: "90%",
                                                        textTransform: "capitalize",
                                                    },
                                                ]}
                                            >
                                                {exercise ? exercise : "push-ups"}
                                            </Text>
                                            <Icon
                                                name={
                                                    showExerciseDropdown
                                                        ? "keyboard-arrow-up"
                                                        : "keyboard-arrow-down"
                                                }
                                                size={20}
                                                color="#333"
                                            />
                                        </TouchableOpacity>

                                        {showExerciseDropdown && (
                                            <View style={styles.dropDownItem}>
                                                <ScrollView style={{ maxHeight: 150 }}>
                                                    {exerciseOption.map((option) => (
                                                        <TouchableOpacity
                                                            key={option}
                                                            style={{ padding: 10 }}
                                                            onPress={() => {
                                                                setExercise(option);
                                                                setShowExerciseDropdown(false);
                                                            }}
                                                        >
                                                            <Text
                                                                style={[
                                                                    styles.bodyText,
                                                                    {
                                                                        width: "100%",
                                                                        textTransform: "capitalize",
                                                                    },
                                                                ]}
                                                            >
                                                                {option}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    ))}
                                                </ScrollView>
                                            </View>
                                        )}
                                    </View>
                                </View>

                                <TextInput
                                    placeholder="Duration (minutes)"
                                    style={[styles.input]}
                                    value={duration}
                                    onChangeText={setDuration}
                                    keyboardType="numeric"
                                />

                                <TextInput
                                    placeholder="Bodyweight (kg)"
                                    style={[styles.input]}
                                    value={weight}
                                    onChangeText={setWeight}
                                    keyboardType="numeric"
                                />

                                <TextInput
                                    style={styles.input}
                                    value={date}
                                    onChangeText={(text) => setLog({ ...log, date: text })}
                                    placeholder="Date (YYYY-MM-DD)"
                                />

                                <TextInput
                                    placeholder={"Calories burnt (kcal)"}
                                    style={[
                                        styles.input
                                    ]}
                                    value={calories}
                                    onChangeText={setCalories}
                                    keyboardType="numeric"
                                />

                                <Button
                                    title="Save Changes"
                                    onPress={async () => {
                                        await editFunction();
                                        setIsEditVisible(false);
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={isVisible}
                    transparent
                    animationType="fade"
                    onRequestClose={() => setIsVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Are you sure you want to delete this log?</Text>
                            <View style={styles.modalActions}>
                                <TouchableOpacity onPress={deleteFunction} style={styles.confirmButton}>
                                    <Text style={styles.buttonText}>Yes, confirm</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setIsVisible(false)} style={styles.cancelButton}>
                                    <Text style={[styles.buttonText, {color: colors[theme].accent}]}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
			</SafeAreaView>
		</>
	);
};

export default WorkoutLogList;

import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BaseToastProps } from "react-native-toast-message";
import { ThemeContext, useTheme } from "@/styles/ThemeContext";
import { getGlobalStyles } from "../../../styles/global";

interface CustomToastProps extends BaseToastProps {
	text1?: string;
	text2?: string;
}

const toastConfig = {
	error: ({ text1, text2 }: CustomToastProps) => {
		const { theme } = useTheme();
		const styles = getGlobalStyles(theme);

		return (
			<View style={[styles.toastContainer, styles.errorBorder]}>
				{text1 && <Text style={styles.errorText}>{text1}</Text>}
				{text2 && <Text style={styles.subText}>{text2}</Text>}
			</View>
		);
	},
	success: ({ text1, text2 }: CustomToastProps) => {
		const { theme } = useTheme();
		const styles = getGlobalStyles(theme);

		return (
			<View style={[styles.toastContainer, styles.successBorder]}>
				{text1 && <Text style={styles.successText}>{text1}</Text>}
				{text2 && <Text style={styles.subText}>{text2}</Text>}
			</View>
		);
	},
	delete: ({ text1, text2 }: CustomToastProps) => {
		const { theme } = useTheme();
		const styles = getGlobalStyles(theme);

		return (
			<View style={[styles.toastContainer, styles.errorBorder]}>
				{text1 && <Text style={styles.errorText}>{text1}</Text>}
				{text2 && <Text style={styles.subText}>{text2}</Text>}
			</View>
		);
	},
};

export default toastConfig;

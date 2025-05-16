import React, { useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { ThemeContext, useTheme } from "@/styles/ThemeContext";
import { getGlobalStyles } from "../../../styles/global";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from "@/styles/themes";

const CustomNavBar = ({ navigation }) => {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);

	return (
		<View style={styles.bottomNav}>
			<TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Icon name="home" size={28} color={"#fff"} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate("Search")}>
                <Icon name="archive-search" size={28} color={"#fff"} />
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate("Profile")}>
                <Icon name="account-settings" size={28} color={"#fff"} />
			</TouchableOpacity>
		</View>
	);
};

export default CustomNavBar;

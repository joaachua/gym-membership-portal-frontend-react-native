import React, { useContext, useRef, useState } from "react";
import {
	View,
	Text,
	FlatList,
	TouchableOpacity,
	useWindowDimensions,
	Platform
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemeContext, useTheme } from "../../styles/ThemeContext";
import { getGlobalStyles } from "../../styles/global";
import carousel_slides from "./carousel_slides";
import OnboardingItem from "./carousle_item";
import { colors } from "@/styles/themes";

export default function Onboarding({ navigation, setHasSeenOnboarding }) {
	const { theme } = useTheme();
	const styles = getGlobalStyles(theme);
	const { width } = useWindowDimensions();

	const [currentIndex, setCurrentIndex] = useState(0);
	const flatListRef = useRef();

	const handleFinishOnboarding = async () => {
		await AsyncStorage.setItem("hasSeenOnboarding", "true");
		setHasSeenOnboarding(true);
	};

	const handleScroll = (event) => {
		const index = Math.round(event.nativeEvent.contentOffset.x / width);
		setCurrentIndex(index);
	};

	const handleNext = () => {
		if (currentIndex < carousel_slides.length - 1) {
			flatListRef.current.scrollToIndex({ index: currentIndex + 1 });
		} else {
			handleFinishOnboarding();
		}
	};

	return (
		<View style={styles.view}>
			{/* Skip button */}
			{currentIndex < carousel_slides.length - 1 && (
				<TouchableOpacity
					style={styles.hoveringRightButton}
					onPress={handleFinishOnboarding}
				>
					<Text style={styles.hoveringRightButtonText}>Skip</Text>
				</TouchableOpacity>
			)}

			{/* Carousel */}
			<FlatList
				ref={flatListRef}
				data={carousel_slides}
				renderItem={({ item }) => <OnboardingItem item={item} navigation={navigation} />}
				keyExtractor={(_, index) => index.toString()}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				onScroll={handleScroll}
				scrollEventThrottle={16}
			/>

			{/* Pagination dots */}
			<View
				style={styles.pagination}
			>
				{carousel_slides.map((_, index) => (
					<View
						key={index}
						style={[styles.carousel_item, {
							backgroundColor:
								currentIndex === index ? "#E38035" : colors[theme].formatted,
						}]}
					/>
				))}
			</View>

			{/* Next / Get Started button */}
			<TouchableOpacity
				style={styles.shadowButton}
				onPress={handleNext}
			>
				<Text style={styles.shadowButtonText}>
					{currentIndex === carousel_slides.length - 1 ? "Get Started" : "Next"}
				</Text>
			</TouchableOpacity>
		</View>
	);
}

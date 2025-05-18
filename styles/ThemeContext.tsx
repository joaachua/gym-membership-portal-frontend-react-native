import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import { colors } from "./themes";

export const ThemeContext = createContext({
	theme: "light",
	colors: colors.light,
	toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
	const systemColorScheme = useColorScheme(); // 'light' | 'dark' | null
	const [theme, setTheme] = useState<"light" | "dark">(systemColorScheme ?? "light");
	const [hasToggled, setHasToggled] = useState(false);

	useEffect(() => {
		// Only set system theme if user hasn't manually toggled
		if (!hasToggled && (systemColorScheme === "dark" || systemColorScheme === "light")) {
			setTheme(systemColorScheme);
		}
	}, [systemColorScheme, hasToggled]);

	const toggleTheme = () => {
		setHasToggled(true); // prevent system override
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	};

	return (
		<ThemeContext.Provider
			value={{ theme, colors: colors[theme], toggleTheme }}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);

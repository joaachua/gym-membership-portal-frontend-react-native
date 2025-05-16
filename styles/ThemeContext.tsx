// style/ThemeContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { useColorScheme } from "react-native"; // detects system theme
import { colors } from "./themes";

// Define your context
export const ThemeContext = createContext({
	theme: "light",
	colors: colors.light,
	toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
	const systemColorScheme = useColorScheme(); // 'light' | 'dark' | null
	const [theme, setTheme] = useState<"light" | "dark">(systemColorScheme ?? "light");

	useEffect(() => {
		if (systemColorScheme === "dark" || systemColorScheme === "light") {
			setTheme(systemColorScheme);
		}
	}, [systemColorScheme]);

	const toggleTheme = () =>
		setTheme((prev) => (prev === "light" ? "dark" : "light"));

	return (
		<ThemeContext.Provider
			value={{ theme, colors: colors[theme], toggleTheme }}
		>
			{children}
		</ThemeContext.Provider>
	);
};

// ✅ Corrected hook
export const useTheme = () => useContext(ThemeContext);

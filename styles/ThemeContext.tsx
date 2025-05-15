// style/ThemeContext.tsx
import React, { createContext, useContext, useState } from "react";
import { colors } from "./themes";

export const ThemeContext = createContext({
	theme: "light",
	colors: colors.light,
	toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
	const [theme, setTheme] = useState<"light" | "dark">("light");
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

export const useTheme = () => useContext(ThemeContext);

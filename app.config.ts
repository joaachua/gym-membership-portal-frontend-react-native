export default {
	expo: {
		name: "MyApp",
		slug: "my-app",
		extra: {
			API_URL: process.env.API_URL,
		},
		android: {
			package: "com.joaachua.myapp",
		},
		plugins: [
			"expo-font"
		] 
	},
};

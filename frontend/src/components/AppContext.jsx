import { useEffect } from "react";
import { useCameraStore } from "../stores";
import GoogleMapProvider from "./providers/GoogleMapProvider";
import ThemeProvider from "./providers/ThemeProvider";

export default function AppContext({ children }) {
	const { toggleTime } = useCameraStore();

	useEffect(() => {
		const interval = setInterval(toggleTime, 12000);
		return () => clearInterval(interval);
	}, []);

	return (
		<GoogleMapProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</GoogleMapProvider>
	);
}

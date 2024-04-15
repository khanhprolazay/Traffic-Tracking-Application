import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import GoogleMapProvider from "./providers/GoogleMapProvider.jsx";
import ThemeProvider from "./providers/ThemeProvider.jsx";

function AppContext({ children }) {
	return (
		<GoogleMapProvider>
			<ThemeProvider>{children}</ThemeProvider>
		</GoogleMapProvider>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<AppContext>
		<App />
	</AppContext>
);

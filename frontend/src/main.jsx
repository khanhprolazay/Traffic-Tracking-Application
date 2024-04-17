import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { GoogleMapProvider, DataProvider, ThemeProvider} from "./providers";

function AppContext({ children }) {
	return (
		<GoogleMapProvider>
			<ThemeProvider>
				<DataProvider>{children}</DataProvider>
			</ThemeProvider>
		</GoogleMapProvider>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<AppContext>
		<App />
	</AppContext>
);

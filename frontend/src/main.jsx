import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import GoogleMapProvider from "./providers/google-map.provider.jsx";
import AntdProvider from "./providers/antd.provider.jsx";

function AppContext({ children }) {
	return (
		<GoogleMapProvider>
			<AntdProvider>
				{children}
			</AntdProvider>
		</GoogleMapProvider>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<AppContext>
			<App />
		</AppContext>
	</Provider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import AntdProvider from "./providers/antd.provider";
import GoogleMapProvider from "./providers/google-map.provider";

function AppContext({ chilren }) {
	return (
		<Provider store={store}>
			<GoogleMapProvider>
				<AntdProvider>{chilren}</AntdProvider>
			</GoogleMapProvider>
		</Provider>
	);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<AppContext>
		<App />
	</AppContext>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import { AntdProvider, GoogleMapProvider } from "./components";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<GoogleMapProvider>
			<AntdProvider>
				<App />
			</AntdProvider>
		</GoogleMapProvider>
	</Provider>
);

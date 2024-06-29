import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";

const HomePage = React.lazy(() => import("./views/home"));
const SearchPage = React.lazy(() => import("./views/search"));
const StreetListPage = React.lazy(() => import("./views/street/list"));
const StreetDetailPage = React.lazy(() => import("./views/street/detail")); 

export default function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<HomePage />} />
					<Route path="map" element={<SearchPage />} />
					<Route path="street" element={<StreetListPage />} />
					<Route path="street/:id" element={<StreetDetailPage />} />
					<Route path="*" element={<HomePage />} />
				</Route>
			</Routes>
		</HashRouter>
	);
}

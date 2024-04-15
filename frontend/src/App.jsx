import { HashRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./views/home";
import SearchPage from "./views/search";

import StreetListPage from "./views/street/list";
import StreetDetailPage from "./views/street/detail";

export default function App() {
	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<HomePage />} />
					<Route path="search" element={<SearchPage />} />
					<Route path="street" element={<StreetListPage />} />
					<Route path="street/:id" element={<StreetDetailPage />} />
					<Route path="*" element={<HomePage />} />
				</Route>
			</Routes>
		</HashRouter>
	);
}

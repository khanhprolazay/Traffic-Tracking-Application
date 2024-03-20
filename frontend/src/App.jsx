import { HashRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { HomePage } from "./pages/home";
import { SearchPage } from "./pages/search";
import { StatisticPage } from "./pages/statistic";
import { toggleTime } from "./app/slices/app.slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		const interval = setInterval(() => {
			dispatch(toggleTime());
		}, 12000);
		return () => clearInterval(interval);
	}, []);

	return (
		<HashRouter>
			<Routes>
				<Route path="/" element={<AppLayout />}>
					<Route index element={<HomePage />} />
					<Route path="*" element={<HomePage />} />
				</Route>

				<Route path="/search" element={<AppLayout />}>
					<Route index element={<SearchPage />} />
				</Route>

				<Route path="/statistic" element={<AppLayout />}>
					<Route index element={<StatisticPage />} />
				</Route>
			</Routes>
		</HashRouter>
	);
}

export default App;

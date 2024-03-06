import { HashRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import { HomePage } from "./pages/home";
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
				</Route>
			</Routes>
		</HashRouter>
	);
}

export default App;

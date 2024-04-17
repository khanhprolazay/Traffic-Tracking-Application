import { useDataStore } from "../stores";
import { getInitialData, getLatestPoint } from "../services/data.service";
import { useEffect } from "react";

export function DataProvider({ children }) {
	const { setData, addPoint } = useDataStore();

	useEffect(() => {
		let interval;

		getInitialData()
			.then((data) => setData(data))
			.then(() => {
				interval = setInterval(() => {
					getLatestPoint().then((point) => addPoint(point));
				}, 1000);
			})
			.catch(() => console.error("Failed to fetch data"));

		return () => clearInterval(interval);
	}, []);

	return children;
}

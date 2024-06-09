import { useDataStore } from "../stores";
import { getInitialData } from "../services/data.service";
import { useEffect, useRef } from "react";
import { PROXY_URL } from "../config";
import { useCameraStore } from "../stores";

const transformDateTime = (item) => ({ ...item, _time: new Date(item._time) });

export function DataProvider({ children }) {
	const { toggleTime } = useCameraStore();
	const { setData, addPoint } = useDataStore();
	const initUnixTime = useRef(Math.floor(Date.now() / 1000));

	useEffect(() => {
		getInitialData()
			.then((data) => setData(data.map(transformDateTime)))
			.then(() => {
				const es = new EventSource(PROXY_URL + "/camera/sse");
				es.onopen = () => console.log("Connected to sse");
				es.onerror = () => {
					throw new Error("Error connecting to sse");
				};
				es.onmessage = (e) => {
					const point = JSON.parse(e.data);
					if (point.time > initUnixTime.current) {
						addPoint(point);
					}
				};
			})
			.catch((e) => console.error(e));
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			toggleTime();
		}, 12000)
		return () => clearInterval(interval);
	}, [])

	return children;
}

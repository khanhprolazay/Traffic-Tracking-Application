import { useDataStore } from "../stores";
import { getInitialData } from "../services/data.service";
import { useEffect, useRef } from "react";
import { PROXY_URL } from "../config";

const transformDateTime = (item) => ({ ...item, _time: new Date(item._time) });

export function DataProvider({ children }) {
	const { setData, addPoint } = useDataStore();
	const initUnixTime = useRef(Math.floor(Date.now() / 1000));

	useEffect(() => {
		getInitialData()
			.then((data) => setData(data.map(transformDateTime)))
			.then(() => {
				const es = new EventSource(PROXY_URL + "/stream");
				es.onopen = () => console.log("Connected to stream");
				es.onerror = () => {
					throw new Error("Error connecting to stream");
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

	return children;
}

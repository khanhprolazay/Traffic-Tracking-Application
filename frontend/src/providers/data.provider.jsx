/** @format */

import { useEffect, useRef } from 'react';
import { PROXY_URL } from '../config';
import { useCameraStore } from '../stores';
import cameras from '../mock/data.camera.dashboard.json';

// {"time":1717942527,"camera_id":"5d8cdb9f766c880017188968","motobikes":2,"cars":5,"status":2,"city_id":"ho-chi-minh"}

export function DataProvider({ children }) {
	const count = useRef(0);
	const analysys = useRef({});
	const { toggleTime, updateAnalysys, updateCameraStatus } = useCameraStore();

	useEffect(() => {
		const es = new EventSource(PROXY_URL + '/camera/sse');
		es.onopen = () => console.log('Connected to sse');
		es.onerror = () => {
			throw new Error('Error connecting to sse');
		};
		es.onmessage = (e) => {
			count.current++;
			const { data } = e;
			const { camera_id, status } = JSON.parse(data);

			if (!analysys.current[status]) {
				analysys.current[status] = 1;
			} else {
				analysys.current[status]++;
			}

			if (count.current === cameras.length) {
				updateAnalysys(analysys.current);
				analysys.current = {};
				count.current = 0;
			}

			updateCameraStatus(camera_id, status);
		};
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			toggleTime();
		}, 12000);
		return () => clearInterval(interval);
	}, []);

	return children;
}

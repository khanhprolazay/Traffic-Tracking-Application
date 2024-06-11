/** @format */

import { useEffect } from 'react';
import { PROXY_URL } from '../config';
import { useCameraStore } from '../stores';

export function DataProvider({ children }) {
	const { toggleTime, updateCamera } =
		useCameraStore();

	useEffect(() => {
		const es = new EventSource(PROXY_URL + '/camera/sse');
		es.onopen = () => console.log('Connected to sse');
		es.onerror = () => {
			throw new Error('Error connecting to sse');
		};
		es.onmessage = (e) => {
			const { data } = e;
			const dataParse = JSON.parse(data);
			updateCamera(dataParse);

			return () => {
				es.close();
			};
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

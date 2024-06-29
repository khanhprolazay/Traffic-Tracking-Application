/** @format */

import { Line } from '@ant-design/charts';
import { useCameraStore, useThemeStore } from '../../../stores';
import { useEffect, useLayoutEffect, useState } from 'react';
import { getCameraData } from '../../../services/data.service';
import { toDate } from '../../../utils';

const _fields = ['cars', 'motobikes', 'status'];
const _step = 60;

export default function RealtimeChart({ id }) {
	const { darkMode } = useThemeStore();
	const { latestCamera } = useCameraStore();
	const [data, setData] = useState([]);

	const config = {
		data: {
			value: data,
			transform: [
				{
					type: 'map',
					callback: (d) => ({
						...d,
						_time: new Date(d._time).toLocaleTimeString(),
					}),
				},
			],
		},
		xField: '_time',
		yField: '_value',
		colorField: '_field',
		meta: {
			time: { alias: 'Time' },
			value: { alias: 'Value' },
		},
	};

	useEffect(() => {
		getCameraData(id).then((res) => setData(res));
	}, []);

	useLayoutEffect(() => {
		if (latestCamera?.id === id) {
			setData((prev) => {
				let data = [];
				_fields.forEach((field, index) => {
					const range = [index * _step, (index + 1) * _step];
					const insertPoint = {
						_field: field,
						_time: toDate(latestCamera.time),
						_value: latestCamera[field],
					};
					data = [...data, ...prev.slice(range[0] + 1, range[1]), insertPoint];
				});
				return data;
			});
		}
	}, [latestCamera]);

	return <Line className="h-[480px]" {...config} theme={darkMode && 'dark'} />;
}

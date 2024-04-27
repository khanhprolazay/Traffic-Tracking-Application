import { Line } from "@ant-design/charts";
import { useThemeStore, useDataStore } from "../../../stores";

export default function RealtimeChart() {
	const { darkMode } = useThemeStore();
  const { data } = useDataStore();
	console.log(data)

	const config = {
		data: {
			value: data,
			transform:[
				{
					type: "map",
					callback: (d) => ({
						...d,
						_time: d._time.toLocaleTimeString(),
					}),
				}
			]
		},
		xField: "_time",
		yField: "_value",
		colorField: "_field",
		meta: {
			time: { alias: "Time" },
			value: { alias: "Value" },
		},
	}

	return (
		<Line className="h-[480px]" {...config} theme={darkMode && "dark"} />
	);
}

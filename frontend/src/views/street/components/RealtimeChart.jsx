import { Line } from "@ant-design/charts";
import { useThemeStore } from "../../../stores/ThemeStore";
import { useDataStore } from "../../../stores/DataStore";

export default function RealtimeChart() {
	const { darkMode } = useThemeStore();
  const { data } = useDataStore();

	const config = {
		data: {
			value: data,
			transform:[
				{
					type: "map",
					callback: (d) => ({
						...d,
						_time: new Date(d._time).toLocaleTimeString(),
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

import { Typography } from "antd";

export default function ExtraInformation({ title, content }) {
	return (
		<Typography.Text className="text-xs">
			<span className="font-semibold">{title}: </span>
			{content}
		</Typography.Text>
	);
}

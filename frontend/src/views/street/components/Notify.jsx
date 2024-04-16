import { Typography } from "antd";

function getBorder(status) {
	switch (status) {
		case "success":
			return "border-[#5D995D]";
		case "warning":
			return "border-[#DAC342]";
		case "danger":
			return "border-[#F64747]";
		default:
			return "border-[#3D98D3]";
	}

}

export default function Notify({ status = "primary", message, subMessage = "" }) {
	return (
		<div className={`border-l-[9px] p-[10px] ${getBorder(status)} border inline-block mr-8 min-w-[200px]`}>
			<Typography.Title level={1} className="!font-normal !text-xl !my-0">
				{message}
				{subMessage && <Typography.Text type="secondary" className="text-xs ml-2">{subMessage}</Typography.Text>}
			</Typography.Title>
		</div>
	);
}

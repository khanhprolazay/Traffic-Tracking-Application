import "../css/table.css";
import { Flex, Tag, Typography } from "antd";
import { StreetStatusText } from "../../../constant";
import { Link } from "react-router-dom";
import { useCameraStore } from "../../../stores";

export default function Table({ data }) {

	// const { setData } = useDetailStore();
	const { cameras } = useCameraStore();

	function getTag(id) {
		const camera = cameras[id];
		const status = camera?.status;
		let color = "success";
		switch (status) {
			case 1:
				color = "warning";
				break;
			case 0:
				color = "error";
				break;
			case 2:
				color = "success";
				break;
			default:
				color = "geekblue"
				break;
		}

		return <Tag color={color}>{StreetStatusText[status] || "Đang tải"}</Tag>;
	}

	// const handleSaveData = (props) => {
	// 	setData({
	// 		cameraID: props.cameraID,
	// 		nameStreet: props.name,
	// 		type: props.type,
	// 		status: props.status,
	// 		startDate: "27/05/2024",
	// 		alongDate: 135,
	// 		totalVehicle: 456
	// 	})
	// }

	return (
		<table className="w-full">
			<tbody className="table-body">
				<tr>
					<td className="p-0">
						<Flex
							align="center"
							justify="space-between"
							className="bg-slate-200 dark:bg-[#2b2b35]">
							<div className="h-[40px] px-[10px] rounded-tr rounded-br relative top-[1px] z-10 min-w-[72px] group-tab bg-white dark:bg-[#141414] flex justify-around items-center">
								<Typography.Text className="text-sm">
									Thành phố: Hồ Chí Minh
								</Typography.Text>
							</div>
						</Flex>
					</td>
				</tr>
				{data.map((camera) => (
					<tr key={`camera-${camera.id}`}>
						<td>
							<Flex
								align="center"
								justify="space-between"
								className="py-2 px-[10px]">
								<Flex align="center" gap={16}>
									<div className="inline-block min-w-20">{getTag(camera.id)}</div>
									<Link
										to={`/street/${camera.id}`}
										className="text-sm font-normal">
										{camera.name}
									</Link>
								</Flex>
								<Typography.Text className="text-sm">
									3 ngày
								</Typography.Text>
							</Flex>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

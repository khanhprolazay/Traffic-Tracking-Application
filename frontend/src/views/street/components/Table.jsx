import "../css/table.css";
import { Flex, Tag, Typography } from "antd";
import { STATUS } from "../../../constant";
import { Link } from "react-router-dom";
import { useDetailStore } from "../../../stores";

export default function Table({ city, streets, cameraID }) {

	const { setData } = useDetailStore();

	function getTag(street) {
		let color = "success";
		switch (street.status) {
			case 2:
				color = "warning";
				break;
			case 3:
				color = "error";
				break;
			default:
				color = "success";
				break;
		}

		return <Tag color={color}>{STATUS[street.status]}</Tag>;
	}

	const handleSaveData = (props) => {
		setData({
			cameraID: props.cameraID,
			nameStreet: props.name,
			type: props.type,
			status: props.status,
			startDate: "27/05/2024",
			alongDate: 135,
			totalVehicle: 456
		})
	}

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
									Thành phố: {city}
								</Typography.Text>
							</div>
						</Flex>
					</td>
				</tr>
				{streets.map((street) => (
					<tr key={`street-${cameraID}-${street.cameraID}`} onClick={() => handleSaveData(street)}>
						<td>
							<Flex
								align="center"
								justify="space-between"
								className="py-2 px-[10px]">
								<Flex align="center" gap={16}>
									<div className="inline-block min-w-20">{getTag(street)}</div>
									<Link
										to={`/street/${street.cameraID}`}
										className="text-sm font-normal">
										{street.name}
									</Link>
								</Flex>
								<Typography.Text className="text-sm">
									{street.age} ngày
								</Typography.Text>
							</Flex>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

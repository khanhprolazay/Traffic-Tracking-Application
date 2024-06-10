import { Button, Card, Col, Divider, Flex, Row } from "antd";
import { STATUS } from "../../../constant";
import "../css/table.css";
import Table from "../components/Table";
import Notify from "../components/Notify";
import { ProForm, ProFormSelect } from "@ant-design/pro-components";
import { useRef, useState } from "react";

const data = [
	{
		id: 1,
		city: "Hồ Chí Minh",
		streets: [
			{
				cameraID: "662b80051afb9c00172dcaf6",
				name: "Nguyễn Trãi - Nguyễn Cư Trinh",
				type: "IMAGE",
				status: 1,
				age: 3,
			},
			{
				cameraID: "662b571d1afb9c00172d9083",
				name: "Cách Mạng Tháng Tám – Phạm Văn Hai (2)",
				type: "IMAGE",
				status: 2,
				age: 1,
			},
			{
				cameraID: "6318283cc9eae60017a19f0c",
				name: "Nguyễn Thị Minh Khai - Đinh Tiên Hoàng 1",
				type: "IMAGE",
				status: 1,
				age: 2,
			},
			{
				cameraID: "662b5a401afb9c00172d91fc",
				name: "Trường Chinh - Nguyễn Hồng Đào",
				type: "IMAGE",
				status: 0,
				age: 2,
			},
			{
				cameraID: "587ee2aeb807da0011e33d52",
				name: "Phan Đăng Lưu - Phan Xích Long",
				type: "IMAGE",
				status: 2,
				age: 2,
			},
			{
				cameraID: "5d8cdb9f766c880017188968",
				name: "Hoàng Văn Thụ - Trần Huy Liệu",
				type: "IMAGE",
				status: 0,
				age: 2,
			},
			{
				cameraID: "6623e7f06f998a001b25244a",
				name: "Đinh Bộ Lĩnh - Chu Văn An",
				type: "IMAGE",
				status: 2,
				age: 2,
			},
			{
				cameraID: "662b56c51afb9c00172d9071",
				name: "Bạch Đằng - Đặng Văn Sâm",
				type: "IMAGE",
				status: 1,
				age: 2,
			}
		]
	},
];

const initialFilter = { status: null }

export default function Page() {
	const formRef = useRef();
	const [filter, setFilter] = useState(initialFilter);
	const resetFilter = () => {
		setFilter(initialFilter);
		formRef.current.resetFields();
	};

	let dataFilter = filter.status ? data.map(city => ({
		...city,
		streets: city.streets.filter(street => street.status === Number.parseInt(filter.status))
	})) : data;

	return (
		<Row justify="center" className="p-6">
			<Col span={24}>
				<Flex>
					<Notify status="primary" message="32" subMessage="tuyến đường" />
					<Notify
						status="success"
						message="32"
						subMessage="tuyến đường thông thoáng"
					/>
					<Notify
						status="warning"
						message="32"
						subMessage="tuyến đường đông đúc"
					/>
					<Notify
						status="danger"
						message="32"
						subMessage="tuyến đường kẹt xe"
					/>
				</Flex>
			</Col>

			<Divider />
			<Col span={24}>
				<ProForm
					grid
					formRef={formRef}
					layout="vertical"
					rowProps={{ gutter: [16, 16] }}
					submitter={{
						render: (props, doms) => <></>,
					}}>
					<ProFormSelect
						colProps={{ xl: 6, xs: 12 }}
						label="Tình trạng"
						name="status"
						onChange={(value) => setFilter({ ...filter, status: value })}
						valueEnum={STATUS}
					/>

					{/* <ProFormSelect
						colProps={{ xl: 4, xs: 12 }}
						label="Thành phố"
						name="city"
						onChange={(value) => {
							setFilter({ ...filter, city: value });
						}}
						valueEnum={{ 1: "Đà Nẵng", 2: "Hà Nội" }}
					/> */}
					<ProForm.Item className="items-end flex">
						<Button type="primary" className="bg-[#165bbe]" onClick={resetFilter}>
							Reset
						</Button>
					</ProForm.Item>
				</ProForm>
			</Col>
			<Col span={24}>
				<Card title="Các tuyến đường" classNames={{ body: "!p-0" }}>
					{dataFilter.map((item, index) => (
						<Table key={`table-${index}`} {...item} />
					))}
				</Card>
			</Col>
		</Row>
	);
}

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
		city: "Đà Nẵng",
		streets: [
			{
				id: 1,
				name: "Nguyễn Văn Linh",
				status: 1,
				age: 3,
			},
			{
				id: 2,
				name: "Nguyễn Tất Thành",
				status: 2,
				age: 1,
			},
			{
				id: 3,
				name: "Nguyễn Hữu Thọ",
				status: 3,
				age: 2,
			},
		],
	},
	{
		id: 2,
		city: "Hà Nội",
		streets: [
			{
				id: 4,
				name: "Nguyễn Văn Linh",
				status: 1,
				age: 3,
			},
			{
				id: 5,
				name: "Nguyễn Tất Thành",
				status: 2,
				age: 1,
			},
			{
				id: 6,
				name: "Nguyễn Hữu Thọ",
				status: 3,
				age: 2,
			},
		],
	},
];

const initialFilter = { status: null, city: null }

export default function Page() {
	const formRef = useRef();
	const [filter, setFilter] = useState(initialFilter);
	const resetFilter = () => {
		setFilter(initialFilter);
		formRef.current.resetFields();
	};

	let dataFilter = data.filter((item) =>
		filter.city ? item.id === Number.parseInt(filter.city) : true
	);

	dataFilter = filter.status ? dataFilter.map(city => ({
		...city,
		streets: city.streets.filter(street => street.status === Number.parseInt(filter.status))
	})) : dataFilter;

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
						colProps={{ xl: 4, xs: 12 }}
						label="Tình trạng"
						name="status"
						onChange={(value) => setFilter({ ...filter, status: value })}
						valueEnum={STATUS}
					/>

					<ProFormSelect
						colProps={{ xl: 4, xs: 12 }}
						label="Thành phố"
						name="city"
						onChange={(value) => {
							setFilter({ ...filter, city: value });
						}}
						valueEnum={{ 1: "Đà Nẵng", 2: "Hà Nội" }}
					/>
					<ProForm.Item className="items-end flex">
						<Button type="primary" className="bg-[#165bbe]" onClick={resetFilter}>
							Reset
						</Button>
					</ProForm.Item>
				</ProForm>
			</Col>
			<Col span={24}>
				<Card title="Các tuyến đường" classNames={{ body: "!p-0" }}>
					{dataFilter.map((item) => (
						<Table {...item} />
					))}
				</Card>
			</Col>
		</Row>
	);
}

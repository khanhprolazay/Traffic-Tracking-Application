/** @format */

import { Button, Card, Col, Divider, Flex, Row } from 'antd';
import { StreetStatus, StreetStatusText } from '../../../constant';
import '../css/table.css';
import Table from '../components/Table';
import Notify from '../components/Notify';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { useCameraStore } from '../../../stores';
import data from '../../../mock/data.camera.dashboard.json';

const initialFilter = { status: null };

export default function Page() {
	const formRef = useRef();
	const { analysys, total } = useCameraStore();
	const [filter, setFilter] = useState(initialFilter);
	const resetFilter = () => {
		setFilter(initialFilter);
		formRef.current.resetFields();
	};

	let dataFilter = filter.status
		? data.map((camera) => camera?.status === Number.parseInt(filter.status))
		: data;

	return (
		<Row justify="center" className="p-6">
			<Col span={24}>
				<Flex>
					<Notify status="primary" message={total} subMessage="tuyến đường" />
					<Notify
						status="success"
						message={analysys[StreetStatus.NORMAL]}
						subMessage="tuyến đường thông thoáng"
					/>
					<Notify
						status="warning"
						message={analysys[StreetStatus.CROWDED]}
						subMessage="tuyến đường đông đúc"
					/>
					<Notify
						status="danger"
						message={analysys[StreetStatus.JAM]}
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
						valueEnum={StreetStatusText}
					/>
					<ProForm.Item className="items-end flex">
						<Button
							type="primary"
							className="bg-[#165bbe]"
							onClick={resetFilter}>
							Reset
						</Button>
					</ProForm.Item>
				</ProForm>
			</Col>
			<Col span={24}>
				<Card title="Các tuyến đường" classNames={{ body: '!p-0' }}>
						<Table data={dataFilter}/>
				</Card>
			</Col>
		</Row>
	);
}

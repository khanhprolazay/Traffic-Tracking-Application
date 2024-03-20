import { Col, Row, Switch, Tooltip } from "antd";
import DashboardCard from "./components/DashboardCard";
import AppGoogleMap from "../../components/AppGoogleMap";
import Camera from "../../components/Camera";
import TableStreet from "./components/TableStreet";
import { TableOutlined, VideoCameraOutlined, EyeOutlined, FilterOutlined } from "@ant-design/icons"
import { useState } from "react";
import data from '../../mock/data.street.mock.json'


export const HomePage = () => {

	const [defaultSwitch, setSwitch] = useState(true);
	const [typeData, setType] = useState('all');

	const showTable = (prop) => {
		setSwitch(prop)
	};

	return (
		<div>
			<div className=" p-6 flex flex-col gap-6">
				<Row gutter={24} className="h-[126px]">
					<Col span={6}>
						<DashboardCard title="Tổng tuyến đường" status="primary" content={32} />
						<Row className="justify-center gap-3 -mt-6 cursor-pointer text-lg opacity-50 transition-opacity">
							<Tooltip title='Xem' className="hover:opacity-20">
								<EyeOutlined onClick={() => { showTable(true); setType('all') }} />
							</Tooltip>
							<Tooltip title='Lọc' className="hover:opacity-20">
								<FilterOutlined onClick={() => { showTable(false); setType('all') }} />
							</Tooltip>
						</Row>
					</Col>
					<Col span={6}>
						<DashboardCard title="Tuyến đường thông thoáng" status="success" content={24} />
						<Row className="justify-center gap-3 -mt-6 cursor-pointer text-lg opacity-50 transition-opacity">
							<Tooltip title='Xem' className="hover:opacity-20">
								<EyeOutlined onClick={() => { showTable(true); setType('success') }} />
							</Tooltip>
							<Tooltip title='Lọc' className="hover:opacity-20">
								<FilterOutlined onClick={() => { showTable(false); setType('success') }} />
							</Tooltip>
						</Row>
					</Col>
					<Col span={6}>
						<DashboardCard title="Tuyến đường đông đúc" status="warning" content={16} />
						<Row className="justify-center gap-3 -mt-6 cursor-pointer text-lg opacity-50 transition-opacity">
							<Tooltip title='Xem' className="hover:opacity-20">
								<EyeOutlined onClick={() => { showTable(true); setType('warning') }} />
							</Tooltip>
							<Tooltip title='Lọc' className="hover:opacity-20">
								<FilterOutlined onClick={() => { showTable(false); setType('warning') }} />
							</Tooltip>
						</Row>
					</Col>
					<Col span={6}>
						<DashboardCard title="Tuyến đường kẹt xe" status="error" content={8} />
						<Row className="justify-center gap-3 -mt-6 cursor-pointer text-lg opacity-50 transition-opacity">
							<Tooltip title='Xem' className="hover:opacity-20">
								<EyeOutlined onClick={() => { showTable(true); setType('error') }} />
							</Tooltip>
							<Tooltip title='Lọc' className="hover:opacity-20">
								<FilterOutlined onClick={() => { showTable(false); setType('error') }} />
							</Tooltip>
						</Row>
					</Col>
				</Row>

				<Row gutter={24} className="h-[calc(100vh-297px)]">
					<Col span={16} className="h-full z-[2] relative">
						<Switch
							className="absolute ml-2 mt-2 z-10"
							rootClassName="bg-slate-400"
							unCheckedChildren={<VideoCameraOutlined />}
							checkedChildren={<TableOutlined />}
							checked={!defaultSwitch}
							onChange={() => { showTable(!defaultSwitch); setType('all') }} />
						{defaultSwitch ? <AppGoogleMap showCamera={true} /> : <TableStreet data={data} typeData={typeData} />}
					</Col>

					<Col span={8} className="h-full flex flex-col gap-4 no-scroll-bar overflow-auto">
						<Camera id="58af9a07bd82540010390c3b" name="Tôn Đức Thắng - Lê Duẫn" />
						<Camera id="58af8d68bd82540010390c2e" name="Nam Kỹ Khởi Nghĩa - Điện Biên Phủ 2" />
						<Camera id="58175c81edeb6c0012a2d5c2" name="Mai Chí Thọ - Trần Não 2" />
					</Col>
				</Row>
			</div>
		</div>
	);
};

import React, { useState } from "react";
import graphql from "../assets/images/graphql.png";
import {
	AppstoreOutlined,
	BarChartOutlined,
	CloudOutlined,
	ShopOutlined,
	TeamOutlined,
	UploadOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from "@ant-design/icons";
import { Image, Layout, Menu } from "antd";
import { Outlet } from "react-router-dom";
import { AppHeader } from "./AppHeader";
const { Content, Footer, Sider } = Layout;

const items = [
	UserOutlined,
	VideoCameraOutlined,
	UploadOutlined,
	BarChartOutlined,
	CloudOutlined,
	AppstoreOutlined,
	TeamOutlined,
	ShopOutlined,
].map((icon, index) => ({
	key: String(index + 1),
	icon: React.createElement(icon),
	label: `nav ${index + 1}`,
}));

export const AppLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => setCollapsed(!collapsed);

	return (
		<Layout hasSider className="w-full">
			<Sider
				trigger={null}
				collapsible
				collapsed={collapsed}
				className="!overflow-auto h-screen !fixed left-0 top-0 bottom-0 z-20">
				<div className="relative flex items-center h-16">
					<Image
						width={32}
						src={graphql}
						className={`${
							collapsed ? "left-5" : "left-4"
						} transition-all ease-linear relative cursor-pointer`}
					/>
					<h1
						className={`${
							collapsed
								? "opacity-0 delay-0 duration-75"
								: "opacity-100 delay-150"
						} transition-all ease-linear absolute left-14 cursor-pointer font-semibold text-sm`}>
						Traffic Dashboard
					</h1>
				</div>
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={["4"]}
					items={items}
				/>
			</Sider>
			<Layout
				className={`${
					collapsed ? "ml-[80px]" : "ml-[200px]"
				} transition-all min-h-screen`}>
				<AppHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed}/>
				<Content className="my-6 mx-6">
					<Outlet />
				</Content>
				<Footer className="text-center shadow">
					Ant Design ©{new Date().getFullYear()} Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
};

import graphql from "../assets/images/graphql.png";
import { BarChartOutlined, UserOutlined } from "@ant-design/icons";
import { Image, Menu, Layout } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";

const items = [
	{ route: "/", label: "Dashboard", icon: <BarChartOutlined /> },
	{ route: "/user", label: "User", icon: <UserOutlined /> },
].map((item, index) => ({
	key: item.route,
	icon: item.icon,
	label: item.label,
	onClick: ({ key }) => console.log(key),
}));

const AppSidebar = ({ collapsed }) => {
	const location = useLocation();

	return (
		<Layout.Sider
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
				selectedKeys={[location.pathname]}
				items={items}
			/>
		</Layout.Sider>
	);
};

export default AppSidebar;
import graphql from "../assets/images/graphql.png";
import { BarChartOutlined, SearchOutlined, HomeOutlined } from "@ant-design/icons";
import { Image, Menu, Layout } from "antd";
// import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

const items = [
	{ route: "/", label: "Dashboard", icon: <HomeOutlined /> },
	{ route: "/search", label: "Search", icon: <SearchOutlined /> },
	{ route: "/statistic", label: "Statistic", icon: <BarChartOutlined /> },
]

const AppSidebar = ({ collapsed }) => {
	const location = useLocation();
	const navigate = useNavigate()

	return (
		<Layout.Sider
			trigger={null}
			collapsible
			collapsed={collapsed}
			className="!overflow-auto h-screen !fixed left-0 top-0 bottom-0 z-20 no-scroll-bar">
			<div className="relative flex items-center h-16" onClick={() => { navigate('/') }}>
				<Image
					preview={false}
					width={32}
					src={graphql}
					className={`${collapsed ? "left-5" : "left-4"
						} transition-all ease-linear relative cursor-pointer`}
				/>
				{!collapsed && (
					<h1
						className={`opacity-100 delay-150"
							 transition-all ease-linear absolute left-14 cursor-pointer font-semibold text-sm`}>
						Traffic Dashboard
					</h1>
				)}
			</div>
			<Menu
				className="text-sm font-normal"
				theme="dark"
				mode="inline"
				selectedKeys={[location.pathname]}
			>
				{items.map((item) => (
					<Menu.Item key={item.route} onClick={() => { navigate(item.route) }} >
						{item.icon}
						<span>{item.label}</span>
					</Menu.Item>
				))}
			</Menu>
		</Layout.Sider>
	);
};


AppSidebar.propTypes = {
	collapsed: PropTypes.bool.isRequired,
}

export default AppSidebar;
import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import AppCameraDrawler from "./AppCameraDrawler";
import PropTypes from 'prop-types';

const { Content, Footer } = Layout;
const AppLayout = () => {
	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => setCollapsed(!collapsed);
	return (
		<Layout hasSider className="w-full">
			<AppSidebar collapsed={collapsed} />
			<AppCameraDrawler />
			<Layout
				className={`${collapsed ? "ml-[80px]" : "ml-[200px]"
					} transition-all min-h-screen`}>
				<AppHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
				<Content>
					<Outlet />
				</Content>
				<Footer className="text-center shadow">
					Ant Design ©{new Date().getFullYear()} Created by Ant UED
				</Footer>
			</Layout>
		</Layout>
	);
};
AppHeader.propTypes = {
	toggleCollapsed: PropTypes.func.isRequired,
};
export default AppLayout;
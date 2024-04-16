import { Layout } from "antd";
import AppCameraDrawler from "./AppCameraDrawler";
import AppHeader from "./AppHeader";
import AppSidebar from "./AppSidebar";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
	const [collapsed, setCollapsed] = useState(false);
	const toggleCollapsed = () => setCollapsed(!collapsed);

	return (
		<Layout hasSider className="w-full">
			<AppSidebar collapsed={collapsed} />
			<AppCameraDrawler />
			<Layout
				className={`${
					collapsed ? "ml-[80px]" : "ml-[200px]"
				} transition-all min-h-screen max-h-screen`}>
				<AppHeader collapsed={collapsed} toggleCollapsed={toggleCollapsed} />
				<Layout.Content className="overflow-auto">
					<Suspense fallback={<></>}>
						<Outlet />
					</Suspense>
				</Layout.Content>
			</Layout>
		</Layout>
	);
}

import {
	BranchesOutlined,
	SearchOutlined,
	HomeOutlined,
} from "@ant-design/icons";
import { Image, Menu, Layout } from "antd";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

const items = [
	{ route: "/", label: "Dashboard", icon: <HomeOutlined /> },
	{ route: "/search", label: "Search", icon: <SearchOutlined /> },
	{ route: "/street", label: "Street", icon: <BranchesOutlined /> },
];

const AppSidebar = ({ collapsed }) => {
	const location = useLocation();
	const pathname = "/" + location.pathname.split("/")[1];

	return (
		<Layout.Sider
			trigger={null}
			collapsible
			collapsed={collapsed}
			className="!overflow-auto h-screen !fixed left-0 top-0 bottom-0 z-20 no-scroll-bar">
			<Link to="/" className="relative flex items-center h-16">
				<Image
					preview={false}
					width={32}
					src="/images/graphql.png"
					className={`${
						collapsed ? "left-5" : "left-4"
					} transition-all ease-linear relative cursor-pointer`}
				/>
				{!collapsed && (
					<h1
						className={`opacity-100 delay-150" text-white
							 transition-all ease-linear absolute left-14 cursor-pointer font-semibold text-sm`}>
						Traffic Dashboard
					</h1>
				)}
			</Link>
			<Menu
				className="text-sm font-normal"
				theme="dark"
				mode="inline"
				selectedKeys={[pathname]}>
				{items.map((item) => (
					<Menu.Item key={item.route}>
						<Link to={item.route}>
							{item.icon}
							<span>{item.label}</span>
						</Link>
					</Menu.Item>
				))}
			</Menu>
		</Layout.Sider>
	);
};

AppSidebar.propTypes = {
	collapsed: PropTypes.bool.isRequired,
};

export default AppSidebar;

import { Layout, Button, Switch, Typography, Flex } from "antd";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SunOutlined,
	MoonOutlined,
} from "@ant-design/icons";
import { useState, useLayoutEffect } from "react";
import { useThemeStore } from "../stores";
import { getTimeString } from "../utils/date.utils";


const AppHeader = (props) => {
	const { collapsed, toggleCollapsed } = props;
	const [time, setTime] = useState(getTimeString());
	const { darkMode, toggleDarkMode } = useThemeStore();

	useLayoutEffect(() => {
		const interval = setInterval(() => {
			setTime(getTimeString());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Layout.Header className="px-6 shadow">
			<Flex align="center" justify="space-between" className="h-full">
				<Button
					type="link"
					className="text-base w-auto text-left border-none focus:outline-none transition-colors shadow-none"
					onClick={toggleCollapsed}
					icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
				/>
				<Flex align="center" gap={16}>
					<Switch
						rootClassName="bg-slate-400"
						unCheckedChildren={<SunOutlined />}
						checkedChildren={<MoonOutlined />}
						checked={darkMode}
						onChange={toggleDarkMode}
					/>
					<Typography>
						<strong>Time: </strong>
						<span>{time}</span>
					</Typography>
				</Flex>
			</Flex>
		</Layout.Header>
	);
};

export default AppHeader;

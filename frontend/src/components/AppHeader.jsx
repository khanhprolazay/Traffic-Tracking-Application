/** @format */

import { Layout, Button, Switch, Typography, Flex } from 'antd';
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SunOutlined,
	MoonOutlined,
} from '@ant-design/icons';
import { useCameraStore, useThemeStore } from '../stores';
import { getTimeString } from '../utils/date.utils';

const AppHeader = (props) => {
	const { collapsed, toggleCollapsed } = props;
	const { videoTime } = useCameraStore();
	const { darkMode, toggleDarkMode } = useThemeStore();

	return (
		<Layout.Header className="px-6 shadow dark:bg-black">
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
						<span>{getTimeString(videoTime)}</span>
					</Typography>
				</Flex>
			</Flex>
		</Layout.Header>
	);
};

export default AppHeader;

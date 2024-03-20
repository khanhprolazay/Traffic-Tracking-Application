import { Layout, Button, Switch, Typography } from "antd";
import {
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	SunOutlined,
	MoonOutlined,
} from "@ant-design/icons";
import { useState, useLayoutEffect } from "react";
import { setDarkMode } from "../app/slices/app.slice";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from 'prop-types';

const { Header } = Layout;

const getTimeString = () => {
	const date = new Date();
	return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
};

const AppHeader = (props) => {
	const dispatch = useDispatch();
	const { collapsed, toggleCollapsed } = props;
	const [time, setTime] = useState(getTimeString());
	const darkMode = useSelector((state) => state.app.darkMode);

	const toggleDarkMode = () => dispatch(setDarkMode(!darkMode));

	useLayoutEffect(() => {
		const interval = setInterval(() => {
			setTime(getTimeString());
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Header className="px-6 shadow flex justify-between items-center">
			<Button
				type="link"
				className="text-base w-auto text-left border-none focus:outline-none transition-colors shadow-none"
				onClick={toggleCollapsed}
				icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
			/>
			<div className="flex gap-4 items-center">
				<Switch
					rootClassName="bg-slate-400"
					unCheckedChildren={<SunOutlined />}
					checkedChildren={<MoonOutlined />}
					checked={darkMode}
					onChange={toggleDarkMode}
				/>
				<Typography>
					<strong>Time: </strong>
					{time}
				</Typography>
			</div>
		</Header>
	);
};

AppHeader.propTypes = {
	collapsed: PropTypes.bool.isRequired,
	toggleCollapsed: PropTypes.bool.isRequired
}

export default AppHeader;
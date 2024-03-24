import { ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";
import PropTypes from 'prop-types';

const AntdProvider = ({ children }) => {
	const darkMode = useSelector((state) => state.app.darkMode);

	return (
		<ConfigProvider
			theme={{
				algorithm: darkMode
					? [theme.darkAlgorithm, theme.compactAlgorithm]
					: theme.compactAlgorithm,
				components: {
					Card: {
						borderRadius: "0px",
						algorithm: true,
					},
					Layout: {
						headerBg: !darkMode && "#fff",
						footerBg: !darkMode && "#fff",
						algorithm: true,
					},
					Typography: {
						algorithm: true,
					},
					Button: {
						colorLink: darkMode ? "#fff" : "#000",
						algorithm: true,
					},
					Switch: {
						algorithm: true,
					},
					Checkbox: {
						lineWidth: 2,
						colorBorder: 'gray',
						borderRadiusSM: 2,
						controlInteractiveSize: 16,
						colorPrimaryHover: false,
						colorPrimary: '#0C8A26',
					}
				},
			}}>
			{children}
		</ConfigProvider>
	);
};

AntdProvider.propTypes = {
	children: PropTypes.any.isRequired,
}

export default AntdProvider;
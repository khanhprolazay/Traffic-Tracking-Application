import { ConfigProvider, theme } from "antd";
import { useSelector } from "react-redux";

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
				},
			}}>
			{children}
		</ConfigProvider>
	);
};

export default AntdProvider;
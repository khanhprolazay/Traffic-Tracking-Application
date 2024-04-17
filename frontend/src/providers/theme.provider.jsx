import { ConfigProvider, theme } from "antd";
import { useThemeStore } from "../stores"
import enUS from 'antd/lib/locale/en_US';

export function ThemeProvider({ children }) {
	const darkMode = useThemeStore((state) => state.darkMode);

	return (
		<ConfigProvider
		  locale={enUS}
			theme={{
				hashed: false,
				algorithm: darkMode
					? [theme.darkAlgorithm, theme.compactAlgorithm]
					: theme.compactAlgorithm,
				components: {
					Card: {
						borderRadius: "0px",
						algorithm: true,
						headerFontSize: 14,
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
						colorBorder: "gray",
						borderRadiusSM: 2,
						controlInteractiveSize: 16,
						colorPrimaryHover: false,
						colorPrimary: "#0C8A26",
					},
					Table: {
						borderRadius: 0,
						algorithm: true,
					},
				},
			}}>
			{children}
		</ConfigProvider>
	);
}

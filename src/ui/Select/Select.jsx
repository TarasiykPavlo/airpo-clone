import { DownOutlined, UpOutlined } from "@ant-design/icons";
import { ConfigProvider } from "antd";
import { Select as SelectAntd } from "antd";

import "./Select.scss";

const Select = ({ isActive, setIsActive, ...otherProps }) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: "Montserrat",
					borderRadius: 10,
					colorText: "#fff",
					colorTextPlaceholder: "rgba(255, 255, 255, 0.8)",
				},
				components: {
					Select: {
						selectorBg: "transparent",
						optionActiveBg: "#355766",
						optionSelectedColor: "#1c1c1c",
						optionFontSize: 16,
					},
				},
			}}
		>
			<SelectAntd
				size="large"
				suffixIcon={
					isActive ? (
						<UpOutlined style={{ color: "#fff" }} />
					) : (
						<DownOutlined style={{ color: "#fff" }} />
					)
				}
				onDropdownVisibleChange={(open) => setIsActive(open)}
				className="select"
				popupClassName="select-popup"
				{...otherProps}
			/>
		</ConfigProvider>
	);
};

export default Select;

import { ConfigProvider, Input as InputAntd } from "antd";

import "./Input.scss";

const Input = ({ ...props }) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					fontFamily: "Montserrat",
					colorTextPlaceholder: "#ffffff95",
					lineWidth: 0.5,
				},
				components: {
					Input: {
						colorBgContainer: "#000",
					},
				},
			}}
		>
			<InputAntd size="large" className="input" {...props} />
		</ConfigProvider>
	);
};

export default Input;

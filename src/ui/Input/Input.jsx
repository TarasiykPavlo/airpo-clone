import { ConfigProvider, Input as InputAntd } from "antd";

import "./Input.scss";

const Input = ({...props}) => {
	return (
		<ConfigProvider
			theme={{
				components: {
					Input: {
						colorBgContainer: "#000",
					},
				},
			}}
		>
			<InputAntd
				size="large"
				className="input"
				{...props}
			/>
		</ConfigProvider>
	);
};

export default Input;

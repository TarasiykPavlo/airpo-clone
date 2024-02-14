import { ConfigProvider, Input } from "antd";

const TextArea = ({ ...others }) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorBgContainer: "#000",
					fontFamily: "Montserrat",
					lineWidth: 0.25,
					colorBorder: "#000",
					colorText: "#fff",
					colorTextPlaceholder: "#ffffff95",
				},
			}}
		>
			<Input.TextArea
				placeholder="Enter message..."
				maxLength={500}
				rows={4}
				allowClear
				{...others}
			/>
		</ConfigProvider>
	);
};

export default TextArea;

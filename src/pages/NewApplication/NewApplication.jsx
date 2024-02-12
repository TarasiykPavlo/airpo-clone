import { ConfigProvider, Input } from "antd";

import "./NewApplication.scss";

const NewApplication = () => {
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
			<main className="new-application">
				<h1 className="application__title">Створити компанію</h1>
				<Input
					placeholder="Введіть назву..."
					size="large"
					maxLength={20}
					type="string"
					className="application__input"
				/>
        
				<div className="new-application__selects-wrapper"></div>

				<footer className="new-application__footer"></footer>
			</main>
		</ConfigProvider>
	);
};

export default NewApplication;

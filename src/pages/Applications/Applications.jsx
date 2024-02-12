import { useState } from "react";
import { Button, ConfigProvider, Select } from "antd";
import {
	CloseCircleFilled,
	DownOutlined,
	ExclamationCircleFilled,
	MoreOutlined,
	PauseCircleFilled,
	PlayCircleFilled,
	UpOutlined,
} from "@ant-design/icons";

import "./Applications.scss";

const Applications = () => {
	const [isDropdownActive, setIsDropdownActive] = useState(false);
	const [service, setService] = useState(null);

	// value: 'telegram', 'viber', 'gmail'
	function handleSelect(value) {
		console.log(value);
		setService(value);
	}

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
			<main className="application">
				<div className="application__chooseCompany">
					<h1 className="application__title">Компанії</h1>

					<Select
						autoFocus
						size="large"
						placeholder="Select service..."
						options={[
							{
								value: "telegram",
								label: "Telegram",
							},
							{
								value: "viber",
								label: "Viber",
							},
							{
								value: "gmail",
								label: "Gmail",
							},
						]}
						suffixIcon={
							isDropdownActive ? (
								<UpOutlined style={{ color: "#fff" }} />
							) : (
								<DownOutlined style={{ color: "#fff" }} />
							)
						}
						onChange={handleSelect}
						onDropdownVisibleChange={(open) => setIsDropdownActive(open)}
						className="application__select"
						popupClassName="application__select-popup"
					/>
				</div>

				{service && (
					<div className="application__crudCompany">
						<section className="application__companies">
							<ul className="application__companies__list">
								<li className="application__companies__item">
									<div className="application__companies__left-side">
										<CloseCircleFilled className="application__companies__stop-icon" />
										<span className="application__companies__name">
											Company 1
										</span>
									</div>

									<div className="application__companies__right-side">
										<ExclamationCircleFilled className="application__companies__error-icon" />
										<PlayCircleFilled className="application__companies__launch-icon" />
										<PauseCircleFilled className="application__companies__pause-icon" />
										<MoreOutlined className="application__companies__more-icon" />
									</div>
								</li>
								<li className="application__companies__item">2</li>
								<li className="application__companies__item">2</li>
								<li className="application__companies__item">2</li>
								<li className="application__companies__item">2</li>
								<li className="application__companies__item">2</li>
								<li className="application__companies__item">2</li>
								<li className="application__companies__item">2</li>
								<li className="application__companies__item">2</li>
								<li className="application__companies__item">2</li>
								<li className="application__companies__item">2</li>
							</ul>
						</section>

						<Button block type="primary" size="large">
							Create company
						</Button>
					</div>
				)}
			</main>
		</ConfigProvider>
	);
};

export default Applications;

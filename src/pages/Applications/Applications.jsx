import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import {
	CloseCircleFilled,
	ExclamationCircleFilled,
	MoreOutlined,
	PauseCircleFilled,
	PlayCircleFilled,
} from "@ant-design/icons";

import Select from "../../ui/Select/Select";
import { selectService } from "../../utils/constants";

import "./Applications.scss";

const Applications = () => {
	const navigate = useNavigate();

	const [service, setService] = useState(null);
	const [isSelectActive, setIsSelectActive] = useState(false);

	// value: 'telegram', 'viber', 'gmail'
	function handleSelect(value) {
		setService(value);
	}

	function handleCreateCompany() {
		navigate("/applications/new");
	}

	return (
		<main className="application">
			<div className="application__chooseCompany">
				<h1 className="application__title">Компанії</h1>

				<Select
					autoFocus
					placeholder="Select service..."
					options={selectService}
					isActive={isSelectActive}
					setIsActive={setIsSelectActive}
					onChange={handleSelect}
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
									<MoreOutlined
										onClick={() => navigate("settings")}
										className="application__companies__more-icon"
									/>
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

					<Button
						block
						type="primary"
						size="large"
						onClick={handleCreateCompany}
					>
						Create company
					</Button>
				</div>
			)}
		</main>
	);
};

export default Applications;

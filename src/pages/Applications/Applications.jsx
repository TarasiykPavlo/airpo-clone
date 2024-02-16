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

import ApplicationLayout from "../../ui/ApplicationLayout";
import Select from "../../ui/Select/Select";
import { selectService } from "../../utils/constants";

import "./Applications.scss";

import CompanyItem from "./CompanyItem";

const Applications = () => {
	const navigate = useNavigate();

	const [isSelectActive, setIsSelectActive] = useState(false);

	const mainContent = (
		<>
			<Select
				autoFocus
				defaultValue="Telegram"
				options={selectService}
				isActive={isSelectActive}
				setIsActive={setIsSelectActive}
				style={{ marginBottom: "3rem" }}
			/>

			<div className="application__divider" />

			<section className="application__companies">
				<ul className="application__list">
					<li className="application__item">
						<div className="application__item-left">
							<CloseCircleFilled className="application__stop-icon" />
							<span className="application__name">TEST!!!!</span>
						</div>

						<div className="application__item-right">
							<ExclamationCircleFilled className="application__error-icon" />
							<PlayCircleFilled className="application__launch-icon" />
							<PauseCircleFilled className="application__pause-icon" />
							<MoreOutlined
								onClick={() => navigate("settings")}
								className="application__more-icon"
							/>
						</div>
					</li>
					<CompanyItem/>
					<li className="application__item">2</li>
					<li className="application__item">2</li>
					<li className="application__item">2</li>
					<li className="application__item">2</li>
					<li className="application__item">2</li>
					<li className="application__item">2</li>
					<li className="application__item">2</li>
					<li className="application__item">2</li>
					<li className="application__item">2</li>
					<li className="application__item">2</li>
					<li className="application__item">2</li>
					<li className="application__item">2</li>
				</ul>
			</section>
		</>
	);

	const footerContent = (
		<Button block type="primary" size="large" onClick={() => navigate("new")}>
			Create company
		</Button>
	);

	return (
		<ApplicationLayout
			title="Companies"
			mainContent={mainContent}
			footerContent={footerContent}
		/>
	);
};

export default Applications;

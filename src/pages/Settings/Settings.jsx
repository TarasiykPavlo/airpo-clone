import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Input from "../../ui/Input/Input";

import "./Settings.scss";

const Settings = () => {
	const navigate = useNavigate();
	const location = useLocation();
	console.log(location);
	console.log(location.state.companyId);

	const [companyName, setCompanyName] = useState("Company name");

	function handleOk() {
		console.log("OK");
	}

	const mainContent = (
		<>
			<div className="application__input-wrapper">
				<Input
					maxLength={10}
					type="string"
					value={companyName}
					onChange={(e) => setCompanyName(e.target.value)}
				/>

				<Button
					block
					type="primary"
					size="large"
					onClick={handleOk}
					style={{ width: "5rem", padding: 0 }}
				>
					OK
				</Button>
			</div>

			<div className="application__info-wrapper">
				<div className="application__info-item">
					Phone: <span>+380938052732</span>
				</div>

				<div className="application__info-item">
					Status: <span>Active</span>
				</div>

				<div className="application__info-item">
					API ID: <span>548866468488664684</span>
				</div>

				<div className="application__info-item">
					API HASH: <span>5488dasd6646848866468adda</span>
				</div>
			</div>

			<div className="settings__template-wrapper">
				<div className="settings__template-text">
					<CloseCircleFilled
						style={{
							color: "#c82121",
							fontSize: "24px",
							marginRight: "0.5rem",
						}}
					/>
					Template: <span>not selected</span>
				</div>

				<Button
					size="large"
					onClick={() => navigate("/applications/templates")}
					className="application__button--black"
				>
					Choose template
				</Button>
			</div>
		</>
	);

	const footerContent = (
		<>
			<Button
				block
				type="primary"
				size="large"
				onClick={() => navigate("/applications/bot-settings")}
			>
				Bot settings
			</Button>

			<Button
				block
				type="primary"
				size="large"
				onClick={() => navigate("/applications/groups-settings")}
			>
				Groups settings
			</Button>

			<Button block danger type="primary" size="large">
				Delete company
			</Button>

			<Button
				block
				size="large"
				onClick={() => navigate("/applications")}
				className="application__button--back"
			>
				Back
			</Button>
		</>
	);

	return (
		<ApplicationLayout
			title="Settings"
			mainContent={mainContent}
			footerContent={footerContent}
		/>
	);
};

export default Settings;

import {
	CloseCircleFilled,
	ExclamationCircleFilled,
	MoreOutlined,
	PauseCircleFilled,
	PlayCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { postResponseToLink } from "../../services/apiApplication";
import { linksResponse } from "../../utils/constants";

function CompanyItem({
	companyName,
	active,
	isRunning,
	companyId,
	botId,
	apiId,
	selectTemplateId,
}) {
	const navigate = useNavigate();

	const companyStatus =
		!active || (botId === null && apiId === null) || selectTemplateId === null;

	async function handlePlayAndStop(link) {
		if (companyStatus) return;

		const codeData = {
			companyId: companyId,
			isRunning: isRunning,
		};

		await postResponseToLink(codeData, link);
		navigate("/applications");
	}

	return (
		<li className="application__item">
			<div className="application__item-left">
				{companyStatus && (
					<CloseCircleFilled className="application__stop-icon" />
				)}
				<span
					className="application__name"
					onClick={() =>
						navigate("settings", {
							state: { companyId: companyId, companyName: companyName },
						})
					}
				>
					{companyName}
				</span>
			</div>

			<div className="application__item-right">
				<ExclamationCircleFilled className="application__error-icon" />
				{companyStatus ? (
					<CloseCircleFilled className="application__stop-icon" />
				) : isRunning ? (
					<PauseCircleFilled
						className="application__pause-icon"
						onClick={() => handlePlayAndStop(linksResponse.stopTelegramSending)}
					/>
				) : (
					<PlayCircleFilled
						className="application__launch-icon"
						onClick={() =>
							handlePlayAndStop(linksResponse.startTelegramSending)
						}
					/>
				)}

				<MoreOutlined
					onClick={() =>
						navigate("settings", {
							state: { companyId: companyId, companyName: companyName },
						})
					}
					className="application__more-icon"
				/>
			</div>
		</li>
	);
}
export default CompanyItem;

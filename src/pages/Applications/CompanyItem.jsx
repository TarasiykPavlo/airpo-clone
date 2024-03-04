import {
  CloseCircleFilled,
  ExclamationCircleFilled,
  MoreOutlined,
  PauseCircleFilled,
  PlayCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { postResponseToLink } from "../../services/apiAplication";

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

  async function handlePlay() {
    if (!active || (botId === null && apiId === null) || selectTemplateId === null) return;
  
    const link = "http://46.175.151.65:8000/api/start_telegram_sending";
    const codeData = {
      companyId: companyId,
      isRunning: isRunning
    };
  
    await postResponseToLink(codeData, link);
    navigate("/applications")
  }

  async function handleStop() {
    if (!active || (botId === null && apiId === null) || selectTemplateId === null) return;
  
    const link = "http://46.175.151.65:8000/api/stop_telegram_sending";
    const codeData = {
      companyId: companyId,
      isRunning: isRunning
    };
  
    await postResponseToLink(codeData, link);
    navigate("/applications")
  }

  return (
    <li className="application__item">
      <div className="application__item-left">
        {!active || (botId === null && apiId === null) || selectTemplateId === null ? (
          <CloseCircleFilled className="application__stop-icon" />
        ) : (
          ""
        )}
        <span className="application__name">{companyName}</span>
      </div>

      <div className="application__item-right">
        <ExclamationCircleFilled className="application__error-icon" />
        {!active || botId === null && apiId === null || selectTemplateId === null ? (
          <CloseCircleFilled className="application__stop-icon" />
        ) : isRunning ? (
          <PauseCircleFilled className="application__pause-icon" onClick={handleStop} />
        ) : (
          <PlayCircleFilled className="application__launch-icon" onClick={handlePlay} />
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

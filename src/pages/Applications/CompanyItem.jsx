import {
  CloseCircleFilled,
  ExclamationCircleFilled,
  MoreOutlined,
  PauseCircleFilled,
  PlayCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

function CompanyItem({
  companyName,
  active,
  isRunning,
  companyId,
  botId,
  selectTemplateId,
}) {
  const navigate = useNavigate();
  return (
    <li className="application__item">
      <div className="application__item-left">
        {!active || botId == null || selectTemplateId == null ? (
          <CloseCircleFilled className="application__stop-icon" />
        ) : (
          ""
        )}
        <span className="application__name">{companyName}</span>
      </div>

      <div className="application__item-right">
        <ExclamationCircleFilled className="application__error-icon" />
        {!active || botId == null || selectTemplateId == null ? (
          <CloseCircleFilled className="application__stop-icon" />
        ) : isRunning ? (
          <PauseCircleFilled className="application__pause-icon" />
        ) : (
          <PlayCircleFilled className="application__launch-icon" />
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

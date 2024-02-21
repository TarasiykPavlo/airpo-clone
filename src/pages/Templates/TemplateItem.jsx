import {
  CloseCircleFilled,
  ExclamationCircleFilled,
  MoreOutlined,
  PauseCircleFilled,
  PlayCircleFilled,
} from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { updateCompanyTemplate } from "../../services/apiAuthClient";

function TemplateItem({
  companyId,
  id,
  templateName,
  text,
  files,
  initialDelay,
  messageDelay,
  mailingInterval,
  sendingAfterJoining,
  selectTemplateId,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  function selectTemplate(companyId, id) {
    updateCompanyTemplate(companyId, id);
    navigate("/applications/settings", {
      state: {
        companyId: location?.state?.companyId,
        companyName: location?.state?.companyName,
      },
    });
  }
  return (
    <li className="application__item">
      <div className="application__item-left">
        <span className="application__name">{templateName}</span>
      </div>

      <div className="application__item-right">
        {id === selectTemplateId ? (
          <PauseCircleFilled
            onClick={() => selectTemplate(companyId, null)}
            className="application__launch-icon"
          />
        ) : (
          <PlayCircleFilled
            onClick={() => selectTemplate(companyId, id)}
            className="application__launch-icon"
          />
        )}
        <MoreOutlined
          onClick={() =>
            navigate("info", {
              state: {
                companyId: companyId,
                templateId: id,
                name: templateName,
                text: text,
                files: files,
                initialDelay: initialDelay,
                messageDelay: messageDelay,
                mailingInterval: mailingInterval,
                sendingAfterJoining: sendingAfterJoining,
              },
            })
          }
          className="application__more-icon"
        />
      </div>
    </li>
  );
}
export default TemplateItem;

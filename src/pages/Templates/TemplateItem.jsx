import {
  CloseCircleFilled,
  ExclamationCircleFilled,
  MoreOutlined,
  PauseCircleFilled,
  PlayCircleFilled,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <li className="application__item">
      <div className="application__item-left">
        <span className="application__name">{templateName}</span>
      </div>

      <div className="application__item-right">
        {id === selectTemplateId ? (
          <PauseCircleFilled
            onClick={() => console.log("Stop")}
            className="application__launch-icon"
          />
        ) : (
          <PlayCircleFilled
            onClick={() => console.log("Play")}
            className="application__launch-icon"
          />
        )}
        <MoreOutlined
          onClick={() =>
            navigate("info", {
              state: {
                companyId: companyId,
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

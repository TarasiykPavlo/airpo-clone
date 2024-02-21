import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Input from "../../ui/Input/Input";
import { useMoveBack } from "../../hooks/useMoveBack";

import "./BotSettings.scss";
import { updateCompanyBotData } from "../../services/apiAuthClient";

const BotSettings = () => {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const location = useLocation();

  const [apiId, setApiId] = useState(location.state?.apiId);
  const [apiHash, setApiHash] = useState(location.state?.apiHash);
  const [botId, setBotId] = useState(location.state?.botId);

  function setNewApiIdAndApiHash() {
    setBotId(null);
    updateCompanyBotData(location?.state?.companyId, apiId, apiHash);
  }

  function saveNewApiIdAndApiHash() {
    setBotId(null);
    updateCompanyBotData(location?.state?.companyId, apiId, apiHash);
    navigate("/applications/settings", {
      state: {
        companyId: location?.state?.companyId,
        companyName: location?.state?.companyName,
        apiId: apiId,
        apiHash: apiHash,
      },
    });
  }

  useEffect(() => {
    if (!location?.state?.companyId) navigate("/applications");
  }, []);

  const mainContent = (
    <>
      <div className="bot-settings__inputs-wrapper">
        <div>
          <p className="bot-settings__input-label">API ID</p>
          <Input
            maxLength={18}
            type="number"
            value={apiId}
            placeholder="Empty  :("
            onChange={(e) => setApiId(e.target.value)}
          />
        </div>

        <div>
          <p className="bot-settings__input-label">API HASH</p>
          <Input
            maxLength={25}
            type="string"
            value={apiHash}
            placeholder="Empty  :("
            onChange={(e) => setApiHash(e.target.value)}
          />
        </div>
      </div>
      <p>{botId ? "Our bot was connected!" : "Our bot is not connected"}</p>
      <p className="application__link" onClick={setNewApiIdAndApiHash}>
        Regenerate API ID, API HASH
      </p>

      <div className="application__tip-wrapper">
        <ExclamationCircleFilled className="application__tip-icon" />

        <p className="application__tip-text">
          Використання наших API ID, API HASH збільшує ймовірність бану. Щоб
          уникнути цього - створіть власні API ID та API HASH за допомогою
          документації.
        </p>
      </div>
    </>
  );

  const footerContent = (
    <>
      <Button
        block
        type="primary"
        size="large"
        onClick={saveNewApiIdAndApiHash}
      >
        Save
      </Button>

      <Button
        block
        size="large"
        onClick={moveBack}
        className="application__button--back"
      >
        Back
      </Button>
    </>
  );

  return (
    <ApplicationLayout
      title="Bot settings"
      mainContent={mainContent}
      footerContent={footerContent}
    />
  );
};

export default BotSettings;

import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Input from "../../ui/Input/Input";
import { useMoveBack } from "../../hooks/useMoveBack";

import "./BotSettings.scss";

const BotSettings = () => {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const location = useLocation();

  const [apiId, setApiId] = useState(location.state?.apiId);
  const [apiHash, setApiHash] = useState(location.state?.apiHash);

  const mainContent = (
    <>
      <div className="bot-settings__inputs-wrapper">
        <div>
          <p className="bot-settings__input-label">API ID</p>
          <Input
            maxLength={18}
            type="string"
            value={apiId}
            onChange={(e) => setApiId(e.target.value)}
          />
        </div>

        <div>
          <p className="bot-settings__input-label">API HASH</p>
          <Input
            maxLength={25}
            type="string"
            value={apiHash}
            onChange={(e) => setApiHash(e.target.value)}
          />
        </div>
      </div>

      <p className="application__link">Regenerate API ID, API HASH</p>

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
      <Button block type="primary" size="large">
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

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Select } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Input from "../../ui/Input/Input";
import { useMoveBack } from "../../hooks/useMoveBack";

import "./BotSettings.scss";
import { updateCompanyBotData } from "../../services/apiAuthClient";
import { linksResponse, proxyType } from "../../utils/constants";
import { postResponseToLink } from "../../services/apiApplication";

const BotSettings = () => {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const location = useLocation();

  const [apiId, setApiId] = useState(location.state?.apiId);
  const [apiHash, setApiHash] = useState(location.state?.apiHash);
  const [botId, setBotId] = useState(location.state?.botId);

  const [selectProxyType, setSelectProxyType] = useState(proxyType[0].value);
  const [proxy, setProxy] = useState(null);
  const ourProxy = null;

  // function setNewApiIdAndApiHash() {
  // 	setBotId(null);
  // 	updateCompanyBotData(location?.state?.companyId, apiId, apiHash);
  // }
  async function setNewApiIdAndApiHash() {
    const link = linksResponse.regenerate_bot_id;

    const codeData = {
      companyId: location?.state?.companyId,
    };

    const { status } = await postResponseToLink(codeData, link);
    //console.log(status);
    status == "ok" || status == "success"
      ? navigate("/applications/settings", {
          state: {
            companyId: location?.state?.companyId,
            companyName: location?.state?.companyName,
          },
        })
      : ""; // Модальне вікно (Виникла помилка)
  }

  function saveNewApiIdAndApiHash() {
    setBotId(null);
    updateCompanyBotData(location?.state?.companyId, apiId, apiHash);
    navigate("/applications/settings", {
      state: {
        companyId: location?.state?.companyId,
        companyName: location?.state?.companyName,
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
            placeholder={!!botId ? "OUR API ID" : "Empty  :("}
            onChange={(e) => setApiId(parseInt(e.target.value, 10))}
          />
        </div>

        <div>
          <p className="bot-settings__input-label">API HASH</p>
          <Input
            maxLength={25}
            type="string"
            value={apiHash}
            placeholder={!!botId ? "OUR API HASH" : "Empty  :("}
            onChange={(e) => setApiHash(e.target.value)}
          />
        </div>
      </div>
      <p>{botId ? "Our bot was connected!" : "Our bot is not connected"}</p>
      <p className="application__link" onClick={setNewApiIdAndApiHash}>
        Regenerate API ID, API HASH
      </p>

      <br />
      <div className="bot-settings__inputs-wrapper">
        <p className="bot-settings__input-label">Proxy</p>
        <div>
          <Select
            defaultValue={selectProxyType}
            className="change-proxy"
            onChange={(e) => {
              setSelectProxyType(e);
            }}
            options={proxyType}
          />
          <Input
            maxLength={25}
            type="string"
            className="change-proxyIPPORT"
            value={proxy}
            placeholder={!!ourProxy ? "OUR PROXY" : "ip:port"}
            onChange={(e) => setProxy(e.target.value)}
          />
        </div>
      </div>
      <div className="application__tip-wrapper">
        <ExclamationCircleFilled className="application__tip-icon" />

        <p className="application__tip-text">
          Using our API IDs and API HASHs increases the likelihood of being
          banned. To avoid this, create your own API ID and API HASH
        </p>
      </div>
      {!!ourProxy&&(<div className="application__tip-wrapper">
        <ExclamationCircleFilled className="application__tip-icon" />

        <p className="application__tip-text">You use our proxy</p>
      </div>)}
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

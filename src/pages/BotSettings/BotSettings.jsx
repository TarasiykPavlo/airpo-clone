import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Select, ConfigProvider, theme, Flex } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import ApplicationLayout from "../../ui/ApplicationLayout";
import Input from "../../ui/Input/Input";
import { useMoveBack } from "../../hooks/useMoveBack";

import "./BotSettings.scss";
import {
  updateCompanyBotData,
  updateCompanyProxy,
} from "../../services/apiAuthClient";
import { linksResponse, proxyType } from "../../utils/constants";
import { postResponseToLink } from "../../services/apiApplication";

const BotSettings = () => {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const location = useLocation();

  const [apiId, setApiId] = useState(location.state?.apiId);
  const [apiHash, setApiHash] = useState(location.state?.apiHash);
  const [botId, setBotId] = useState(location.state?.botId);

  const [selectProxyType, setSelectProxyType] = useState(
    location.state?.proxyType || proxyType[0].value
  );
  const [proxy, setProxy] = useState(location.state?.proxy);

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

  function saveButton() {
    updateCompanyProxy(location?.state?.companyId, selectProxyType, proxy);
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
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <>
        <div
          className="bot-settings__inputs-wrapper"
          style={{ marginBottom: "1rem" }}
        >
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
        {/* <p>{botId ? "Our bot was connected!" : "Our bot is not connected"}</p> */}
        {!botId && (
          <p className="application__link" onClick={setNewApiIdAndApiHash}>
            Get OUR API ID, API HASH
          </p>
        )}

        <div>
          <p
            className="bot-settings__input-label"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            Proxy
            {!location.state?.proxy && (
              <div
                className="application__tip-wrapper"
                style={{ width: "600px", margin: 0 }}
              >
                <ExclamationCircleFilled className="application__tip-icon" />

                <p className="application__tip-text">You use our proxy</p>
              </div>
            )}
          </p>

          <div className="bot-settings__input-wrap">
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
              type="text"
              className="change-proxyIPPORT"
			  style={{width:"100%"}}
              value={proxy}
              placeholder={"ip:port (0.0.0.0:8000)"}
              onChange={(e) => {
				if(!isNaN(Number(e.target.value.replace('.', '').replace(':', '')))){
					setProxy(e.target.value)
				}
              }}
            />
          </div>
        </div>
        <br />
        <div className="application__tip-wrapper">
          <ExclamationCircleFilled className="application__tip-icon" />

          <p className="application__tip-text">
            Using our API IDs and API HASHs increases the likelihood of being
            banned. To avoid this, create your own API ID and API HASH
          </p>
        </div>
        <br />
      </>
    </ConfigProvider>
  );

  const footerContent = (
    <>
      <Button block type="primary" size="large" onClick={saveButton}>
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

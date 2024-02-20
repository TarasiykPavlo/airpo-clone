import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Spin } from "antd";
import { CloseCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Input from "../../ui/Input/Input";

import "./Settings.scss";
import { getCompanyData } from "../../features/authentication/useCompanyData";
import { DelClientCompany } from "../../services/apiAuthClient";

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: company } = getCompanyData(location?.state?.companyId);

  const [companyName, setCompanyName] = useState(location?.state?.companyName);

  async function DelCompany(){
    await DelClientCompany(company.ClientCompanysData.id);
    navigate("/applications")
  }
  useEffect(() => {
    if (!location?.state) navigate("/applications");
  }, []);

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
          SAVE
        </Button>
      </div>

      <div className="application__info-wrapper">
        <div className="application__info-item">
          Phone: <span>{company?.ClientCompanysData.phone || <Spin />}</span>
        </div>

        <div className="application__info-item">
          {!company?.ClientCompanysData.active &&
            company?.ClientCompanysData !== undefined && (
              <CloseCircleFilled
                style={{
                  color: "#c82121",
                  fontSize: "20px",
                  marginRight: "0.5rem",
                }}
              />
            )}
          Status:{" "}
          <span>
            {company?.ClientCompanysData.active === undefined ? (
              <Spin />
            ) : company?.ClientCompanysData.active ? (
              "Active"
            ) : (
              "Disabled"
            )}
          </span>
        </div>

        <div className="application__info-item">
          {company?.ClientCompanyBot.apiId === undefined &&
            company?.ClientCompanyBot !== undefined && (
              <CloseCircleFilled
                style={{
                  color: "#c82121",
                  fontSize: "20px",
                  marginRight: "0.5rem",
                }}
              />
            )}
          API ID:{" "}
          <span>
            {!!company?.ClientCompanyBot.apiId ? (
              company?.ClientCompanyBot?.apiId
            ) : company?.ClientCompanysData === undefined ? (
              <Spin />
            ) : (
              "NOT SELECTED"
            )}
          </span>
        </div>

        <div className="application__info-item">
          {company?.ClientCompanyBot.apiHash === undefined &&
            company?.ClientCompanyBot !== undefined && (
              <ExclamationCircleFilled
                style={{
                  color: "#c82121",
                  fontSize: "20px",
                  marginRight: "0.5rem",
                }}
              />
            )}
          API HASH:{" "}
          <span>
            {!!company?.ClientCompanyBot.apiHash ? (
              company?.ClientCompanyBot?.apiHash
            ) : company?.ClientCompanysData === undefined ? (
              <Spin />
            ) : (
              "NOT SELECTED"
            )}
          </span>
        </div>
      </div>

      <div className="settings__template-wrapper">
        <div className="settings__template-text">
          {company?.ClientMessageTemplates.name === undefined &&
            company !== undefined && (
              <CloseCircleFilled
                style={{
                  color: "#c82121",
                  fontSize: "20px",
                  marginRight: "0.5rem",
                }}
              />
            )}
          Template:{" "}
          <span>
            {!!company?.ClientMessageTemplates.name ? (
              company?.ClientMessageTemplates.name
            ) : company?.ClientMessageTemplates === undefined ? (
              <Spin />
            ) : (
              "NOT SELECTED"
            )}
          </span>
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
        onClick={() =>
          navigate("/applications/bot-settings", {
            state: {
              companyId: location?.state?.companyId,
              apiId: company?.ClientCompanyBot?.apiId,
              apiHash: company?.ClientCompanyBot?.apiHash,
            },
          })
        }
      >
        Bot settings
      </Button>

      <Button
        block
        type="primary"
        size="large"
        onClick={() =>
          navigate("/applications/groups-settings", {
            state: {
              companyId: location?.state?.companyId,
              region: company?.ClientCompanysData.region,
              сategories: company?.ClientCompanysData.сategories,
            },
          })
        }
      >
        Groups settings
      </Button>

      <Button
        block
        danger
        type="primary"
        size="large"
        onClick={DelCompany}
      >
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

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Spin, message } from "antd";
import { CloseCircleFilled, ExclamationCircleFilled } from "@ant-design/icons";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Input from "../../ui/Input/Input";

import "./Settings.scss";
import { getCompanyData } from "../../features/authentication/useCompanyData";
import {
  delClientCompany,
  saveNameCompany,
} from "../../services/apiAuthClient";
import { linksResponse } from "../../utils/constants";
import { postResponseToLink } from "../../services/apiApplication";

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: company, refetch } = getCompanyData(location?.state?.companyId);
  const [companyName, setCompanyName] = useState(location?.state?.companyName);
  const [messageShow, messageContext] = message.useMessage();

  async function delCompany() {
    const codeData = {
      companyId: location?.state?.companyId,
      phone: company?.ClientCompanysData.phone,
    };

    const { status } = await postResponseToLink(
      codeData,
      linksResponse.delete_company
    );
    console.log(status);
    if (status == "ok") {
      messageShow.success("Deleted");
      navigate("/applications");
    } else messageShow.error("error");

    // await delClientCompany(company?.ClientCompanysData.id);
    // navigate("/applications");
  }

  async function saveName(value) {
    await saveNameCompany(company?.ClientCompanysData.id, value);
    setCompanyName(value);
    navigate("/applications");
  }

  // setTimeout(() => {
  //   if (refetch) {
  //     refetch();
  //   } else {
  //     getCompanyData(location?.state?.companyId);
  //   }
  // }, 1000);

  useEffect(() => {
    if (!location?.state) navigate("/applications");
  }, []);

  const mainContent = (
    <>
      {messageContext}
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
          onClick={() => saveName(companyName)}
          style={{ width: "5rem", padding: 0 }}
        >
          OK
        </Button>
      </div>

      <div className="application__info-wrapper">
        <div className="application__info-item">
          Phone: <span>{company?.ClientCompanysData.phone || <Spin />}</span>
        </div>

        <div className="application__info-item">
          {!company?.ClientCompanysData.active && (
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
            ) : company?.ClientCompanysData.isRunning ? (
              "Running"
            ) : (
              "Disabled"
            )}
          </span>
        </div>

        <div className="application__info-item">
          {company?.ClientCompanysData.apiId === null &&
          company?.ClientCompanysData.botId === null ? (
            <CloseCircleFilled
              style={{
                color: "#c82121",
                fontSize: "20px",
                marginRight: "0.5rem",
              }}
            />
          ) : company?.ClientCompanysData.botId === null ? (
            ""
          ) : (
            <ExclamationCircleFilled
              style={{
                color: "#FFD700",
                fontSize: "20px",
                marginRight: "0.5rem",
              }}
            />
          )}
          API ID:{" "}
          <span>
            {company?.ClientCompanysData === undefined ? (
              <Spin />
            ) : !!company?.ClientCompanysData.apiId ? (
              //location?.state?.apiId ||
              company?.ClientCompanysData?.apiId
            ) : company?.ClientCompanysData.botId === null ? (
              "NOT SELECTED"
            ) : (
              "OUR API ID"
            )}
          </span>
        </div>

        <div className="application__info-item">
          {company?.ClientCompanysData.apiHash === null &&
          company?.ClientCompanysData.botId === null ? (
            <ExclamationCircleFilled
              style={{
                color: "#c82121",
                fontSize: "20px",
                marginRight: "0.5rem",
              }}
            />
          ) : company?.ClientCompanysData.botId === null ? (
            ""
          ) : (
            <ExclamationCircleFilled
              style={{
                color: "#FFD700",
                fontSize: "20px",
                marginRight: "0.5rem",
              }}
            />
          )}
          API HASH:{" "}
          <span>
            {company?.ClientCompanysData === undefined ? (
              <Spin />
            ) : !!company?.ClientCompanysData.apiHash ? (
              //location?.state?.apiHash ||
              company?.ClientCompanysData.apiHash
            ) : company?.ClientCompanysData.botId === null ? (
              "NOT SELECTED"
            ) : (
              "OUR API HASH"
            )}
          </span>
        </div>
      </div>

      <div className="settings__template-wrapper">
        <div className="settings__template-text">
          {company?.ClientCompanysData.selectTemplateId === null && (
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
            {company?.ClientMessageTemplates === undefined ? (
              <Spin />
            ) : !!company?.ClientMessageTemplates.name ? (
              //location?.state?.templateName ||
              company?.ClientMessageTemplates.name
            ) : (
              "NOT SELECTED"
            )}
          </span>
        </div>

        <Button
          size="large"
          onClick={() =>
            navigate("/applications/templates", {
              state: {
                companyId: location?.state?.companyId,
                companyName: location?.state?.companyName,
                selectTemplateId: company?.ClientCompanysData?.selectTemplateId,
              },
            })
          }
          className="application__button--black"
        >
          Choose template
        </Button>
      </div>
    </>
  );

  const footerContent = (
    <>
      {/* {company?.ClientCompanysData.active && (<Button
				block
				type="primary"
				size="large"
				onClick={() => navigate("/applications")}
			>
				Start
			</Button>)} */}

      <Button
        block
        type="primary"
        size="large"
        onClick={() =>
          navigate("/applications/bot-settings", {
            state: {
              companyId: location?.state?.companyId,
              companyName: location?.state?.companyName,
              apiId: company?.ClientCompanysData.apiId,
              apiHash: company?.ClientCompanysData.apiHash,
              botId: company?.ClientCompanysData.botId,
              proxy: company?.ClientCompanysData.proxy,
              proxyType: company?.ClientCompanysData.proxyType,
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

      <Button block danger type="primary" size="large" onClick={delCompany}>
        Delete company
      </Button>

      <Button
        block
        size="large"
        onClick={() =>
          navigate("/applications", {
            state: {
              region: company?.ClientCompanysData.region,
              progType: company?.ClientCompanysData.progType,
            },
          })
        }
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

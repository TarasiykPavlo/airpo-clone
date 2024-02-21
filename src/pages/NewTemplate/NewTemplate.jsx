import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Upload } from "antd";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Input from "../../ui/Input/Input";
import TextArea from "../../ui/TextArea";
import { useMoveBack } from "../../hooks/useMoveBack";

import "./NewTemplate.scss";
import InputRange from "../../ui/InputRange/InputRange";
import {
  createClientTemplate,
  delClientTemplate,
  updateClientTemplate,
} from "../../services/apiAuthClient";
import { useUser } from "../../features/authentication/useUser";

const NewTemplate = () => {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();

  const [templateName, setTemplateName] = useState(location?.state?.name);
  const [messageText, setMessageText] = useState(location?.state.text);

  const [messageInterval, setMessageInterval] = useState(
    location?.state?.initialDelay || 0
  );
  const [mailingDelay, setMailingDelay] = useState(
    location?.state?.messageDelay || 25
  );
  const [mailingStart, setMailingStart] = useState(
    location?.state?.mailingInterval || 360
  );

  useEffect(() => {
    if (!location?.state?.companyId) navigate("/applications");
  }, []);

  function createTemplate() {
    createClientTemplate(
      user?.id,
      messageText,
      null,
      messageInterval,
      mailingDelay,
      mailingStart,
      templateName
    );
    navigate("/applications/templates", {
      state: {
        companyId: location?.state?.companyId,
        companyName: location?.state?.companyName,
      },
    });
  }

  function delTemplate() {
    delClientTemplate(location?.state.templateId);
    navigate("/applications/templates", {
      state: {
        companyId: location?.state?.companyId,
        companyName: location?.state?.companyName,
      },
    });
  }

  function updateTemplate() {
    updateClientTemplate(
      location?.state.templateId,
      messageText,
      null,
      messageInterval,
      mailingDelay,
      mailingStart,
      templateName
    );
    navigate("/applications/templates", {
      state: {
        companyId: location?.state?.companyId,
        companyName: location?.state?.companyName,
      },
    });
  }

  const mainContent = (
    <>
      <Input
        placeholder="Enter name..."
        maxLength={20}
        type="string"
        value={templateName}
        onChange={(e) => setTemplateName(e.target.value)}
        style={{ marginBottom: "1rem" }}
      />

      <TextArea
        onChange={(e) => setMessageText(e.target.value)}
        value={messageText}
        style={{
          height: "10rem",
          resize: "none",
          marginBottom: "1rem",
        }}
      />

      <Upload>
        <Button block size="large" className="application__button--black">
          Click to Upload
        </Button>
      </Upload>

      <div className="ranges-container">
        <div className="ranges-container__row">
          <p>Message sending interval - {messageInterval} sec</p>
          <InputRange
            value={messageInterval}
            setValue={setMessageInterval}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div className="ranges-container__row">
          <p>Delay between mailings - {mailingDelay} sec</p>
          <InputRange
            value={mailingDelay}
            setValue={setMailingDelay}
            min={0}
            max={100}
            step={1}
          />
        </div>

        <div className="ranges-container__row">
          <p>Start before mailing - {mailingStart} sec</p>
          <InputRange
            value={mailingStart}
            setValue={setMailingStart}
            min={0}
            max={500}
            step={5}
          />
        </div>
      </div>
    </>
  );

  const footerContent = (
    <>
      {location?.state === undefined ? (
        "..."
      ) : location?.state.templateId === null ? (
        <Button block type="primary" size="large" onClick={createTemplate}>
          Create
        </Button>
      ) : (
        <Button block type="primary" size="large" onClick={updateTemplate}>
          Save
        </Button>
      )}
      {!(location?.state.templateId === null) ? (
        <Button
          block
          danger
          type="primary"
          size="large"
          onClick={delTemplate}
        >
          Delete
        </Button>
      ) : (
        ""
      )}

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
    <>
      <ApplicationLayout
        title="Templates"
        mainContent={mainContent}
        footerContent={footerContent}
      />
    </>
  );
};

export default NewTemplate;

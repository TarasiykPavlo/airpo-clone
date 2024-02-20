import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button, Upload } from "antd";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Input from "../../ui/Input/Input";
import TextArea from "../../ui/TextArea";
import { useMoveBack } from "../../hooks/useMoveBack";

import "./NewTemplate.scss";
import InputRange from "../../ui/InputRange/InputRange";

const NewTemplate = () => {
  const moveBack = useMoveBack();
  const location = useLocation();
  const [templateName, setTemplateName] = useState(location?.state?.name);
  
  const [messageInterval, setMessageInterval] = useState(
    location?.state?.initialDelay
  );
  const [mailingDelay, setMailingDelay] = useState(
    location?.state?.messageDelay
  );
  const [mailingStart, setMailingStart] = useState(
    location?.state?.mailingInterval
  );
  const [templateText, setTemplateText] = useState(
    location?.state?.text
  );

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
        value={templateText}
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

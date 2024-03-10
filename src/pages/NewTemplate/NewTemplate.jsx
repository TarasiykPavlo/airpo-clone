import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Modal, Upload } from "antd";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Input from "../../ui/Input/Input";
import TextArea from "../../ui/TextArea";

import "./NewTemplate.scss";
import InputRange from "../../ui/InputRange/InputRange";
import {
  createClientTemplate,
  delClientTemplate,
  updateClientTemplate,
} from "../../services/apiAuthClient";
import { useUser } from "../../features/authentication/useUser";
import { uploadFileToTemplate } from "../../services/apiAuth";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const NewTemplate = () => {
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
  const [fileList, setFileList] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  useEffect(() => {
    if (!location?.state?.companyId) navigate("/applications");
  }, []);

  function moveBackButton() {
    navigate("/applications/templates", {
      state: {
        companyId: location?.state?.companyId,
        companyName: location?.state?.companyName,
        selectTemplateId: location?.state?.selectTemplateId,
      },
    });
  }
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
    <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
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
      {console.log()}
      <Upload
      style={{color:"#f9fafb"}}
        accept=".jpeg, .jpg"
        action="https://run.mocky.io/v3/dc24de02-8bab-469b-b8b9-cdfa73d45260"
        listType="picture"
        // beforeUpload={() => {
        //     return false;
        //  }}
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onDownload={() => {console.log(fileList) 
          //uploadFileToTemplate
        }}
      >
        
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
            max={60}
            step={1}
          />
        </div>

        <div className="ranges-container__row">
          <p>Delay between mailings - {mailingDelay} sec</p>
          <InputRange
            value={mailingDelay}
            setValue={setMailingDelay}
            min={10}
            max={120}
            step={1}
          />
        </div>

        <div className="ranges-container__row">
          <p>Start before mailing - {mailingStart} sec</p>
          <InputRange
            value={mailingStart}
            setValue={setMailingStart}
            min={240}
            max={600}
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
        <Button block danger type="primary" size="large" onClick={delTemplate}>
          Delete
        </Button>
      ) : (
        ""
      )}

      <Button
        block
        size="large"
        onClick={moveBackButton}
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

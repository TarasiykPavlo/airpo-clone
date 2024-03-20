import { useLocation, useNavigate } from "react-router-dom";
import { Button, ConfigProvider, Modal, Spin } from "antd";

import ApplicationLayout from "../../ui/ApplicationLayout";
import GroupItem from "../../ui/GroupItem";
import { useMoveBack } from "../../hooks/useMoveBack";

import "./GroupsSettings.scss";
import { useCompanyGroupsData } from "../../features/authentication/useCompanyGrupeData";
import { useState } from "react";

const GroupsSettings = () => {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const location = useLocation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: groups } = useCompanyGroupsData(location?.state?.companyId);

  function saveGroupsChange() {
    navigate("/applications/settings", {
      state: {
        companyId: location?.state?.companyId,
        companyName: location?.state?.companyName,
      },
    });
  }

  const customModalRender = (node) => (
    <div style={{ backgroundColor: "#1c1c1c" }}>{node}</div>
  );

  const closeModalWindow = () => {
    setIsModalOpen(false);
  };

  const mainContent = (
    <>
      <div
        className="application__info-wrapper"
        style={{ marginBottom: "1.5rem" }}
      >
        <div className="application__info-item">
          Region: <span>{location?.state?.region}</span>
        </div>

        <div className="application__info-item">
          Category: <span>{location?.state?.сategories}</span>
        </div>

        <div className="application__info-item">
          Total groups:{" "}
          <span>{groups === undefined ? <Spin /> : groups?.length}</span>
        </div>
      </div>

      <p className="application__link">Change region / category</p>

      <div className="application__divider mb-3" />

      <Button
        block
        size="large"
        className="application__button--black"
        onClick={() => setIsModalOpen(true)}
      >
        Add new group
      </Button>

      <div className="group-settings__groups-wrapper">
        {groups?.map((item) => (
          <GroupItem
            key={Math.random()}
            groupName={item.name}
            tag={item.tag}
            priority={item.priority}
          />
        ))}
      </div>
    </>
  );

  const footerContent = (
    <>
      <Button block type="primary" size="large" onClick={saveGroupsChange}>
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
      <Modal
        title="Add new group"
        open={isModalOpen}
        onOk={closeModalWindow}
        onCancel={closeModalWindow}
        wrapClassName="custom-modal"
        footer={[
          <Button key="back" onClick={closeModalWindow}>
            Clean
          </Button>,
          <Button key="submit" type="primary" onClick={closeModalWindow}>
            Save
          </Button>,
        ]}
      ></Modal>
    </>
  );

  return (
    <ApplicationLayout
      title="Groups settings"
      mainContent={mainContent}
      footerContent={footerContent}
    />
  );
};

export default GroupsSettings;

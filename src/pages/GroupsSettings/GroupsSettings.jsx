import { useLocation, useNavigate } from "react-router-dom";

import {
  Button,
  ConfigProvider,
  Modal,
  Select,
  Spin,
  theme,
  Input,
  Typography,
  message,
} from "antd";

import ApplicationLayout from "../../ui/ApplicationLayout";
import GroupItem from "../../ui/GroupItem";
import { useMoveBack } from "../../hooks/useMoveBack";

import "./GroupsSettings.scss";
import { useCompanyGroupsData } from "../../features/authentication/useCompanyGrupeData";
import { useState } from "react";
import {
  selectRegion,
  selectCategory,
  linksResponse,
} from "../../utils/constants";
import { createGroupinCompany } from "../../services/apiAuthClient";
import { postResponseToLink } from "../../services/apiApplication";

const GroupsSettings = () => {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const location = useLocation();
  const [messageShow, messageContext] = message.useMessage();

  const [region, setRegion] = useState(
    location?.state?.region || selectRegion[0].label
  );
  const [category, setCategory] = useState(
    location?.state?.сategories || selectCategory[0].label
  );
  const [groupName, setGroupName] = useState("My group");
  const [groupTag, setGroupTag] = useState(null);
  const [priority, setPriority] = useState(10);
  const [
    isModalOpenChangeCategoryOrRegion,
    setIsModalOpenChangeCategoryOrRegion,
  ] = useState(false);
  const [isModalOpenCreateGroup, setIsModalOpenCreateGroup] = useState(false);
  const [isSelectRegionActive, setIsSelectRegionActive] = useState(false);
  const [isSelectCategoryActive, setIsSelectCategoryActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { data: groups } = useCompanyGroupsData(location?.state?.companyId);

  const handleChange = (e) => {
    let value = e.target.value.trim();
    if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 99)) {
      setPriority(value === "" ? null : parseInt(value));
    }
  };
  const showModal = () => {
    setIsModalOpenChangeCategoryOrRegion(true);
  };
  const handleOk = async () => {
    setIsModalOpenChangeCategoryOrRegion(false);
    setIsLoading(true);
    const codeData = {
      companyId: location?.state?.companyId,
      region,
      category,
    };

    const { status } = await postResponseToLink(
      codeData,
      linksResponse.set_company_region_and_category
    );
    console.log(status);
    if (status == "success") {
      messageShow.success("The group list is complete");
      setIsLoading(false);
    } else {
      messageShow.error("error");
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalOpenChangeCategoryOrRegion(false);
  };

  function saveGroupsChange() {
    navigate("/applications/settings", {
      state: {
        companyId: location?.state?.companyId,
        companyName: location?.state?.companyName,
      },
    });
  }
  async function сopyPreparedGroups() {
    setIsLoading(true);
    const codeData = {
      companyId: location?.state?.companyId,
    };

    const { status } = await postResponseToLink(
      codeData,
      linksResponse.populate_company_groups
    );
    console.log(status);
    if (status == "success") {
      messageShow.success("The group list is complete");
      setIsLoading(false);
    } else {
      messageShow.error("error");
      setIsLoading(false);
    }
  }

  const mainContent = (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <div
        className="application__info-wrapper"
        style={{ marginBottom: "1.5rem" }}
      >
        {messageContext}
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
      {isLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          {" "}
          <Spin className="application__link" />{" "}
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div onClick={сopyPreparedGroups} className="application__link">
            Copy prepared groups
          </div>
          <div onClick={showModal} className="application__link">
            Change region / category
          </div>{" "}
        </div>
      )}
      <Modal
        title="Change region & category"
        open={isModalOpenChangeCategoryOrRegion}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="new-application__selects-wrapper">
          <span className="new-application__select-title">Region:</span>
          <Select
            defaultValue={region ? region : null}
            placeholder="Select region..."
            options={selectRegion}
            isActive={isSelectRegionActive}
            setIsActive={setIsSelectRegionActive}
            onChange={(value) => setRegion(value)}
            size="medium"
          />

          <span className="new-application__select-title">Category:</span>
          <Select
            defaultValue={category ? category : null}
            placeholder="Select category..."
            options={selectCategory}
            isActive={isSelectCategoryActive}
            setIsActive={setIsSelectCategoryActive}
            onChange={(value) => setCategory(value)}
            size="medium"
          />
        </div>
      </Modal>

      <div className="application__divider mb-3" />

      <Button
        onClick={() => setIsModalOpenCreateGroup(true)}
        block
        size="large"
        className="application__button--black"
      >
        Add new group
      </Button>
      <Modal
        title="Create Group"
        open={isModalOpenCreateGroup}
        onOk={() => {
          setIsModalOpenCreateGroup(false),
            createGroupinCompany(
              location.state.companyId,
              groupName,
              groupTag,
              priority,
              region,
              category
            );
        }}
        onCancel={() => setIsModalOpenCreateGroup(false)}
      >
        <br />
        <div className="new-application__selects-wrapper">
          <span className="new-application__select-title">Name Group</span>
          {/* <Typography.Title level={5} >Name Group</Typography.Title> */}
          <Input
            placeholder="name group"
            onChange={(e) => setGroupName(e.target.value)}
            defaultValue={groupName}
          ></Input>
        </div>
        <div className="new-application__selects-wrapper">
          <span className="new-application__select-title">Group Tag:</span>
          <Input
            placeholder="@tag"
            onChange={(e) => setGroupTag(e.target.value)}
          ></Input>
        </div>
        <div className="new-application__selects-wrapper">
          <span className="new-application__select-title">Priority:</span>
          <Input
            placeholder="10"
            maxLength={2}
            style={{ width: "5rem" }}
            type="Number"
            min={0}
            step={1}
            max={99}
            onChange={handleChange}
          ></Input>
        </div>
        <div className="new-application__selects-wrapper">
          <span className="new-application__select-title">Region:</span>
          <Select
            defaultValue={region ? region : null}
            placeholder="Select region..."
            options={selectRegion}
            isActive={isSelectRegionActive}
            setIsActive={setIsSelectRegionActive}
            onChange={(value) => setRegion(value)}
            size="medium"
          />

          <span className="new-application__select-title">Category:</span>
          <Select
            defaultValue={category ? category : null}
            placeholder="Select category..."
            options={selectCategory}
            isActive={isSelectCategoryActive}
            setIsActive={setIsSelectCategoryActive}
            onChange={(value) => setCategory(value)}
            size="medium"
          />
        </div>
        <br />
      </Modal>
      <div className="group-settings__groups-wrapper">
        {groups?.map((item, index) => (
          <GroupItem
            key={index}
            groupId={item.id}
            groupName={item.name}
            tag={item.tag}
            priority={item.priority}
          />
        ))}
      </div>
    </ConfigProvider>
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
    </>
  );

  return (
    <ApplicationLayout
      title="Groups settings"
      mainContent={mainContent}
      footerContent={footerContent}
    />
  );

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
};

export default GroupsSettings;

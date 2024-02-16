import { Button } from "antd";

import ApplicationLayout from "../../ui/ApplicationLayout";
import GroupItem from "../../ui/GroupItem";
import { useMoveBack } from "../../hooks/useMoveBack";

import "./GroupsSettings.scss";

const GroupsSettings = () => {
  const moveBack = useMoveBack();

  const mainContent = (
    <>
      <div
        className="application__info-wrapper"
        style={{ marginBottom: "1.5rem" }}
      >
        <div className="application__info-item">
          Region: <span>UA</span>
        </div>

        <div className="application__info-item">
          Category: <span>IT</span>
        </div>

        <div className="application__info-item">
          Total groups: <span>100</span>
        </div>
      </div>

      <p className="application__link">Change region / category</p>

      <div className="application__divider mb-3" />

      <Button block size="large" className="application__button--black">
        Add new group
      </Button>

      <div className="group-settings__groups-wrapper">
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
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
      title="Groups settings"
      mainContent={mainContent}
      footerContent={footerContent}
    />
  );
};

export default GroupsSettings;

import { useLocation, useNavigate } from "react-router-dom";
import { Button, Spin } from "antd";

import ApplicationLayout from "../../ui/ApplicationLayout";
import GroupItem from "../../ui/GroupItem";
import { useMoveBack } from "../../hooks/useMoveBack";

import "./GroupsSettings.scss";
import { useCompanyGroupsData } from "../../features/authentication/useCompanyGrupeData";

const GroupsSettings = () => {
  const moveBack = useMoveBack();
  const navigate = useNavigate();
  const location = useLocation();
  const { data: groups } = useCompanyGroupsData(location?.state?.companyId);

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
          Total groups: <span>{groups?.length? groups?.length : <Spin />}</span>
        </div>
      </div>

      <p className="application__link">Change region / category</p>

      <div className="application__divider mb-3" />

      <Button block size="large" className="application__button--black">
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

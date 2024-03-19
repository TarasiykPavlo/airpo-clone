import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, message } from "antd";

import { useUser } from "../../features/authentication/useUser";
import { useUserCompany } from "../../features/authentication/useClientCompanyData";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Select from "../../ui/Select/Select";
import { selectService } from "../../utils/constants";

import "./Applications.scss";

import CompanyItem from "./CompanyItem";
import { usePermissionsData } from "../../features/authentication/useClientPermissionsData";

const Applications = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const [messageShow, messageContext] = message.useMessage();

  const [isSelectActive, setIsSelectActive] = useState(false);
  const [progType, setProgType] = useState(
    location?.state?.progType || "Telegram"
  );

  const { user } = useUser();
  const { data: userCompanyData } = useUserCompany(user.id);
  const { data: PermissionsData } = usePermissionsData(user.id);

  const onlyCompanyWithThisType = userCompanyData?.filter(
    (company) => company.progType === progType
  );
  const onlySelectPermission = PermissionsData?.filter(
    (permission) => permission.progType === progType
  );
  function createСompanyButton() {
    if (progType != "Telegram") return navigate("/products");

    userCompanyData === undefined || PermissionsData === undefined
      ? messageShow.error("Imposible")
      : onlySelectPermission.length == 0
      ? messageShow.error("You don`t have permissions")
      : onlyCompanyWithThisType?.length >=
        onlySelectPermission[0].LimitOfСompanies
      ? messageShow.error("You have Limit")
      : navigate("new");
  }

  const mainContent = (
    <>
      {messageContext}
      <Select
        autoFocus
        defaultValue={progType}
        options={selectService}
        isActive={isSelectActive}
        setIsActive={setIsSelectActive}
        onChange={(e) => setProgType(e)}
        style={{ marginBottom: "3rem" }}
      />

      <div className="application__divider" />

      <section className="application__companies">
        <ul className="application__list">
          {(onlySelectPermission?.length > 0) && onlyCompanyWithThisType?.map((item) => (
            <CompanyItem
              key={item.id}
              companyName={item.name}
              active={item.active}
              isRunning={item.isRunning}
              companyId={item.id}
              botId={item.botId}
              apiId={item.apiId}
              selectTemplateId={item.selectTemplateId}
            />
          ))}
        </ul>
      </section>
    </>
  );

  const footerContent = (
    onlySelectPermission?.length !== 0? 
    <Button block type="primary" size="large" onClick={createСompanyButton}>
      Create company ({onlyCompanyWithThisType?.length}/{onlySelectPermission[0]?.LimitOfСompanies || 0})
    </Button> :
    <Button block type="primary" size="large" onClick={() => navigate("/products")}>
    Buy Application
  </Button>
  );

  return (
    <ApplicationLayout
      title="Companies"
      mainContent={mainContent}
      footerContent={footerContent}
    />
  );
};

export default Applications;

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";

import { useUser } from "../../features/authentication/useUser";
import { useUserCompany } from "../../features/authentication/useClientCompanyData";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Select from "../../ui/Select/Select";
import { selectService } from "../../utils/constants";

import "./Applications.scss";

import CompanyItem from "./CompanyItem";

const Applications = () => {
  const LimitOfСompanies = 5;

  const navigate = useNavigate();
  const location = useLocation();

  const [isSelectActive, setIsSelectActive] = useState(false);
  const [progType, setProgType] = useState(location?.state?.progType || "Telegram");

  const { user } = useUser();
  const { data: userCompany } = useUserCompany(user.id);
  const onlyCompanyWithThisType = userCompany?.filter((company) => company.progType === progType);

  function createСompanyButton() {
    if (progType != "Telegram") return navigate("/products")

    userCompany === undefined
      ? alert("imposible")
      : onlyCompanyWithThisType?.length >= LimitOfСompanies
      ? alert("limit")
      : navigate("new");

  }

  const mainContent = (
    <>
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
          {onlyCompanyWithThisType?.map((item) => (
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
    <Button block type="primary" size="large" onClick={createСompanyButton}>
      Create company ({onlyCompanyWithThisType?.length}/{LimitOfСompanies})
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

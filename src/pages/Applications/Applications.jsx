import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

import { useUser } from "../../features/authentication/useUser";
import { useUserCompany } from "../../features/authentication/useClientCompanyData";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Select from "../../ui/Select/Select";
import { selectService } from "../../utils/constants";

import "./Applications.scss";

import CompanyItem from "./CompanyItem";

const Applications = () => {
  const navigate = useNavigate();

  const [isSelectActive, setIsSelectActive] = useState(false);

  const { user } = useUser();
  const { data: userCompany } = useUserCompany(user.id);
  const [progType, setProgType] = useState("Telegram");

  function handleService(value) {
    setProgType(value);
  }

  const mainContent = (
    <>
      <Select
        autoFocus
        defaultValue="Telegram"
        options={selectService}
        isActive={isSelectActive}
        setIsActive={setIsSelectActive}
        onChange={handleService}
        style={{ marginBottom: "3rem" }}
      />

      <div className="application__divider" />

      <section className="application__companies">
        <ul className="application__list">
          {userCompany
            ?.filter((company) => company.progType === progType)
            ?.map((item) => (
              <CompanyItem
                key={Math.random()}
                companyName={item.name}
                active={item.active}
                isRunning={item.isRunning}
                companyId={item.id}
                botId={item.botId}
                selectTemplateId ={item.selectTemplateId}
              />
            ))}
        </ul>
      </section>
    </>
  );

  const footerContent = (
    <Button block type="primary" size="large" onClick={() => navigate("new")}>
      Create company
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

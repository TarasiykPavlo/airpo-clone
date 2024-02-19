import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

import { useUser } from "../../features/authentication/useUser";
import { getUserCompany } from "../../features/authentication/useClientCompanyData";
import { UpdateUserCompanes } from "../../features/authentication/useUpdateClientCompanyData";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Select from "../../ui/Select/Select";
import { selectService } from "../../utils/constants";

import "./Applications.scss";

import CompanyItem from "./CompanyItem";

const Applications = () => {
  const navigate = useNavigate();

  const [isSelectActive, setIsSelectActive] = useState(false);
  const {updateCompanies} = UpdateUserCompanes();

  const { user } = useUser();
  var { data: userCompany } = getUserCompany(user.id, "Telegram");

  function handleService(value) {
    updateCompanies({userId: user?.id, progType: value});
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
          {userCompany?.map((item) => (
            <CompanyItem
              key={Math.random()}
              companyName={item.name}
              active={item.active}
              isRunning={item.isRunning}
              companyId={item.id}
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

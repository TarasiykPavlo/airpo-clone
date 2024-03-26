import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, Tooltip, Spin } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { PhoneInput } from "react-international-phone";

import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";
import ApplicationLayout from "../../ui/ApplicationLayout";

import { postResponseToLink } from "../../services/apiApplication";
import { useUser } from "../../features/authentication/useUser";
import { validatePhone } from "../../utils/helpers";
import {
  selectRegion,
  selectCategory,
  linksResponse,
} from "../../utils/constants";

import "react-international-phone/style.css";
import "./NewApplication.scss";

const NewApplication = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const userId = user.id;

  const localData = JSON.parse(localStorage.getItem("newCompany"));
  const [companyName, setCompanyName] = useState(
    localData?.name || "CompanyName"
  );
  const [region, setRegion] = useState(localData?.region || selectRegion[0].label);
  const [category, setCategory] = useState(localData?.category || selectCategory[0].label);
  const [phone, setPhone] = useState("");
  const isPhoneValid = validatePhone(phone);

  const [isSelectRegionActive, setIsSelectRegionActive] = useState(false);
  const [isSelectCategoryActive, setIsSelectCategoryActive] = useState(false);
  const [isNextHovered, setIsNextHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function postCompany() {
    if (!isPhoneValid) return;

    const companyData = {
      name: companyName.trim(),
      region,
      category,
      phone,
      userId,
    };

    setIsLoading(true);
    await postResponseToLink(companyData, linksResponse.sendTelegramCode);
    setIsLoading(false);

    navigate("/applications/new/phone-validation", {
      state: {
        phone: phone,
      },
    });
  }

  const mainContent = (
    <>
      <Input
        placeholder="Enter name..."
        maxLength={20}
        type="string"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />

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

      <div className="new-application__phone-wrapper">
        <span className="new-application__phone-title">
          Enter phone (Telegram):
        </span>

        <PhoneInput
          defaultCountry="ua"
          value={phone}
          onChange={(phone) => setPhone(phone)}
        />

        <div className="application__tip-wrapper">
          <ExclamationCircleFilled className="application__tip-icon" />

          <p className="application__tip-text">
            Do not use your main Telegram account, as there is always a risk of
            account banning!
          </p>
        </div>
      </div>
    </>
  );

  const footerContent = (
    <>
      <p className="new-application__footer-text">
        Where to buy a telegram account? <NavLink to="/faq">FAQ</NavLink>
      </p>

      <Tooltip
        placement="top"
        title="Please enter valid phone"
        color="#4CBDED"
        open={isNextHovered && !isPhoneValid}
      >
        <Button
          block
          type="primary"
          size="large"
          onClick={postCompany}
          onMouseEnter={() => setIsNextHovered(true)}
          onMouseLeave={() => setIsNextHovered(false)}
        >
          Next
        </Button>
      </Tooltip>

      <Button
        block
        size="large"
        onClick={() => navigate("/applications")}
        className="application__button--back"
      >
        Back
      </Button>
    </>
  );

  return (
    <ApplicationLayout
      title="Create company"
      mainContent={mainContent}
      footerContent={footerContent}
      showSpin={isLoading}
    />
  );
};

export default NewApplication;

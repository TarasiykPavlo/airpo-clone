import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { PhoneInput } from "react-international-phone";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";

import { validatePhone } from "../../utils/helpers";
import {
  selectRegion,
  selectCategory,
  linksResponse,
} from "../../utils/constants";

import "react-international-phone/style.css";
import "./NewApplication.scss";
import { postResponseToLink } from "../../services/apiApplication";
import { useUser } from "../../features/authentication/useUser";

const NewApplication = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const userId = user.id;

  const localData = JSON.parse(localStorage.getItem("newCompany"));
  const [companyName, setCompanyName] = useState(localData?.name || "CompanyName");
  const [region, setRegion] = useState(localData?.region || "EU");
  const [category, setCategory] = useState(localData?.category || "IT");
  const [phone, setPhone] = useState("");
  const isPhoneValid = validatePhone(phone);

  const [isSelectRegionActive, setIsSelectRegionActive] = useState(false);
  const [isSelectCategoryActive, setIsSelectCategoryActive] = useState(false);
  const [isNextHovered, setIsNextHovered] = useState(false);

  async function postCompany() {
    if (!isPhoneValid) return;

    const companyData = {
      name: companyName.trim(),
      region,
      category,
      phone,
      userId,
    };

    var a = await postResponseToLink(
      companyData,
      linksResponse.sendTelegramCode
    );
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
            Не використовуйте свій основний акаунт телеграм, оскільки завжди є
            ризики бану акаунта!
          </p>
        </div>
      </div>
    </>
  );

  const footerContent = (
    <>
      <p className="new-application__footer-text">
        Якщо у вас немає резервного акаунту телеграм - ви можете його{" "}
        <span>купити на сайті</span>
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
    />
  );
};

export default NewApplication;

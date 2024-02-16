import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Tooltip } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { PhoneInput } from "react-international-phone";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";

import { validatePhone } from "../../utils/helpers";
import { selectRegion, selectCategory } from "../../utils/constants";

import "react-international-phone/style.css";
import "./NewApplication.scss";

const NewApplication = () => {
  const navigate = useNavigate();

  const localData = JSON.parse(localStorage.getItem("newCompany"));
  const [companyName, setCompanyName] = useState(localData?.name || "");
  const [region, setRegion] = useState(localData?.region || "");
  const [category, setCategory] = useState(localData?.category || "");
  const [phone, setPhone] = useState("");
  const isPhoneValid = validatePhone(phone);

  const [isSelectRegionActive, setIsSelectRegionActive] = useState(false);
  const [isSelectCategoryActive, setIsSelectCategoryActive] = useState(false);
  const [isNextHovered, setIsNextHovered] = useState(false);

  async function postCompany(data) {
    try {
      const response = await fetch("http://46.175.151.65:8000/api/start_api", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("OK");
      }
    } catch (error) {
      console.log(error);
    } finally {
      console.log("FINALLY!");
    }
  }

  async function handleNext() {
    if (!isPhoneValid) return;

    const companyData = {
      name: companyName,
      region,
      category,
      phone,
    };

    console.log(companyData);
    await postCompany(companyData);
    localStorage.setItem("newCompany", JSON.stringify(companyData));
    navigate("/applications/new/phone-validation");
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
          onClick={handleNext}
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

import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Tooltip } from "antd";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Input from "../../ui/Input/Input";
import { formatTimer } from "../../utils/helpers";

import "./PhoneValidation.scss";
import { postResponseToLink } from "../../services/apiAplication";

const PhoneValidation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.phone) navigate("/applications/new");
  }, [location]);

  const [code, setCode] = useState("");
  const [isOkHovered, setIsOkHovered] = useState(false);

  const [timer, setTimer] = useState(99);
  const [isTImerOver, setIsTimerOver] = useState(false);
  const [isCodeApprove, setIsCodeApprove] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      if (timer > 1) {
        setTimer((prevTimer) => prevTimer - 1);
      } else {
        setIsTimerOver(true);
        clearInterval(t);
      }
    }, 1000);

    if (isCodeApprove) clearInterval(t);

    // const t = timer > 0 && setInterval(() => setTimer(timer - 1), 1000);

    return () => clearInterval(t);
  }, [timer, isCodeApprove]);

  async function handleOk() {
    if (!code.length) return;

    const link = "http://46.175.151.65:8000/api/sign_in_with_code_in_telegram";
    const codeData = {
      phone: location?.state?.phone,
      code,
    };

    await postResponseToLink(codeData, link);

    if (code == 1111) setIsCodeApprove(true);
    console.log(code);
  }

  function handleCompaniesButton() {
    navigate("/applications");
  }

  const disabledStyles = (isTImerOver || isCodeApprove) && {
    border: "none",
    backgroundColor: "#000",
    color: "#fff",
  };

  const mainContent = (
    <div className="phone-validation__code-wrapper">
      <span className="phone-validation__input-title">
        Verify code (Telegram):
      </span>

      <div className="application__input-wrapper">
        <Input
          placeholder="Enter code..."
          maxLength={5}
          type="string"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          disabled={isTImerOver || isCodeApprove}
          style={{ width: "calc(100% - 6rem)", ...disabledStyles }}
        />

        <Tooltip
          placement="bottomRight"
          title="Please enter code"
          color="#4CBDED"
          open={isOkHovered && !code.length}
        >
          <Button
            block
            type="primary"
            size="large"
            disabled={isTImerOver || isCodeApprove}
            onClick={handleOk}
            onMouseEnter={() => setIsOkHovered(true)}
            onMouseLeave={() => setIsOkHovered(false)}
            style={{
              width: "5rem",
              padding: 0,
              ...disabledStyles,
            }}
          >
            OK
          </Button>
        </Tooltip>
      </div>

      {!isTImerOver && !isCodeApprove && (
        <p className="phone-validation__timer-wrapper">
          Time remaining: <span>{formatTimer(timer)}</span>s
        </p>
      )}
    </div>
  );

  const footerContent = (
    <>
      <p className="phone-validation__footer-text">
        {isTImerOver && "Time is out!"}
        {isCodeApprove && "Everything was successful!"}
      </p>
      {isTImerOver || isCodeApprove ? (
        <Button
          block
          type="primary"
          size="large"
          onClick={() => {
            if (isTImerOver) {
              navigate("/applications/new/");
              const companyData = JSON.parse(
                localStorage.getItem("newCompany")
              );

              const updatedData = { ...companyData, phone: "" };
              localStorage.setItem("newCompany", JSON.stringify(updatedData));
            }
            if (isCodeApprove) {
              handleCompaniesButton();
              localStorage.removeItem("newCompany");
            }
          }}
        >
          {isTImerOver && "Back"}
          {isCodeApprove && "Go to companies"}
        </Button>
      ) : null}
    </>
  );

  return (
    <ApplicationLayout
      title="Confirmation"
      mainContent={mainContent}
      footerContent={footerContent}
    />
  );
};

export default PhoneValidation;
import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

import { useUser } from "../../features/authentication/useUser";

import ApplicationLayout from "../../ui/ApplicationLayout";
import TemplateItem from "./TemplateItem";
import "./Templates.scss";
import { useClientTemlates } from "../../features/authentication/useClientTemlatatesData";
import { useEffect } from "react";

const Templates = () => {
  const { user } = useUser();
  const { data: temlates } = useClientTemlates(user?.id);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location?.state?.companyId) navigate("/applications");
  }, []);

  function moveBackButton() {
    navigate("/applications/settings", {
      state: {
        companyId: location?.state?.companyId,
        companyName: location?.state?.companyName,
      },
    });
  }

  function createTemplateButton() {
    temlates === undefined
      ? alert("imposible")
      : temlates.length >= 5
      ? alert("limit")
      : navigate("info", {
          state: {
            companyId: location?.state?.companyId,
            companyName: location?.state?.companyName,
            templateId: null,
          },
        });
  }
  const mainContent = (
    <section className="templates__list">
      <ul className="application__list">
        {temlates?.map((item) => (
          <TemplateItem
            key={item.id}
            companyId={location?.state?.companyId}
            companyName={location?.state?.companyName}
            id={item.id}
            apiId={item.apiId}
            templateName={item.name}
            text={item.text}
            files={item.files}
            initialDelay={item.initialDelay}
            messageDelay={item.messageDelay}
            mailingInterval={item.mailingInterval}
            sendingAfterJoining={item.sendingAfterJoining}
            selectTemplateId={location?.state?.selectTemplateId}
          />
        ))}
      </ul>
    </section>
  );

  const footerContent = (
    <>
      <Button block type="primary" size="large" onClick={createTemplateButton}>
        Create template ({temlates?.length}/5)
      </Button>

      <Button
        block
        size="large"
        onClick={moveBackButton}
        className="application__button--back"
      >
        Back
      </Button>
    </>
  );

  return (
    <>
      <ApplicationLayout
        title="Templates"
        mainContent={mainContent}
        footerContent={footerContent}
      />
    </>
  );
};

export default Templates;

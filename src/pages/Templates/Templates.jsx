import { Button } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { MoreOutlined, PlayCircleFilled } from "@ant-design/icons";

import { useUser } from "../../features/authentication/useUser";

import ApplicationLayout from "../../ui/ApplicationLayout";
import { useMoveBack } from "../../hooks/useMoveBack";
import TemplateItem from "./TemplateItem";
import "./Templates.scss";
import { useClientTemlates } from "../../features/authentication/useClientTemlatatesData";
import { useEffect } from "react";

const Templates = () => {
  const { user } = useUser();
  const { data: temlates } = useClientTemlates(user?.id);
  const navigate = useNavigate();
  const location = useLocation();
  const moveBack = useMoveBack();

  useEffect(() => {
    if (!location?.state?.companyId) navigate("/applications");
  }, []);

  const mainContent = (
    <section className="templates__list">
      <ul className="application__list">
        {temlates?.map((item) => (
          <TemplateItem
            key={item.id}
            companyId={location?.state?.companyId}
            id={item.id}
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
      <Button
        block
        type="primary"
        size="large"
        onClick={() => navigate("info")}
      >
        Create template
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

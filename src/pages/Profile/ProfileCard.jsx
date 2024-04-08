import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message, Popover } from "antd";
import {
  InfoCircleOutlined,
  CopyOutlined,
  LockOutlined,
} from "@ant-design/icons";

import { useUser } from "../../features/authentication/useUser";
import { useAuthClient } from "../../features/authentication/useClientDataForProfile";

import ButtonForIcon from "../../ui/ButtonForIcon";
import ProfilePaymentsHistoryItem from "./ProfilePaymentsHistoryItem";
import ProfileReferalsHistoryItem from "./ProfileReferralHistoryItem";
import { formatDate } from "../../utils/helpers";
import { usePermissionsData } from "../../features/authentication/useClientPermissionsData";

function ProfileCard() {
  const navigate = useNavigate();

  const { user } = useUser();
  const { aicoin, full_name, fullName } = user.user_metadata;
  const { data: clientData } = useAuthClient(user.id);
  const { data: PermissionsData } = usePermissionsData(user.id);
  const [activeButton, setActiveButton] = useState("personalBtn");
  const [messageShow, messageContext] = message.useMessage();

  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 1140px)").matches
  );

  useEffect(() => {
    window
      .matchMedia("(max-width: 1140px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);

  return (
    <div className="cards-wrap">
      {messageContext}
      <div
        className={activeButton === "personalBtn" ? "card active" : "card"}
        id="personal"
      >
        <div
          className="card__head-name"
          id="personalBtn"
          onClick={(e) => setActiveButton(e.target.id)}
        >
          Personal Area
        </div>
        <div className="card__info">
          <div className="card__main-info">
            <div className="card__user-info">
              <div className="card__user-content">
                <div className="title">Рersonal information</div>
                <div
                  id="id"
                  className="card__text"
                  style={{ color: "#80D4FF", padding:"0.2rem"}}
                  onClick={() => {
                    navigator.clipboard.writeText(user?.id);
                    messageShow.info("Copy ID!");
                  }}
                >
                  ID: {user?.id}
                </div>
              </div>
              <div id="name" className="card__text" style={{padding:"0.2rem"}}>
                Name: {full_name || fullName}
              </div>
              <div id="email" className="card__text" style={{padding:"0.2rem",paddingBottom: "1rem"}}>
                Email: {user?.email}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  top: "15px",
                  right: "15px",
                  position: "absolute",
                }}
              >
                <Popover
                  content="Your personal data that you provided during registration."
                  trigger="click"
                >
                  <ButtonForIcon
                    icon={
                      <InfoCircleOutlined
                        style={{
                          color: "#24A1E0",
                        }}
                      />
                    }
                  />
                </Popover>
              </div>
            </div>
            <div className="ref-link">
              Referral link:
              <div
                className="link"
                onClick={() => {
                  navigator.clipboard.writeText(
                    "https://ai-pro.company/" + user?.id
                  );
                  messageShow.info("Copy link!");
                }}
              >
                {user?.id}
              </div>
              <div className="popover-item">
                <CopyOutlined
                  style={{
                    fontSize: "15px",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://ai-pro.company/" + user?.id
                    );
                    messageShow.info("Copy link!");
                  }}
                />
                <Popover
                  content="Invite new users through your link and receive 10% in AiCoin, from each purchase by your invited users."
                  trigger="click"
                >
                  <ButtonForIcon
                    icon={
                      <InfoCircleOutlined
                        style={{ color: "#24A1E0", fontSize: "15px" }}
                      />
                    }
                  />
                </Popover>
              </div>
            </div>
            {PermissionsData !== undefined && PermissionsData.length == 0 ? (
              <Button
                type="primary"
                className="btn-check"
                block
                style={{ display: "block", marginBottom: "1rem" }}
                onClick={() => navigate("/products")}
              >
                Shop
              </Button>
            ) : (
              <Button
                type="primary"
                className="btn-check"
                block
                style={{ display: "block", marginBottom: "1rem" }}
                onClick={() => navigate("/applications")}
              >
                My products
              </Button>
            )}
          </div>
          <div className="card__pay">
            <div className="title">
              Payments
              <div className="card__balance">Balance: {aicoin} AIC</div>
            </div>

            <ul className="card__history">
              {clientData?.ClientAicoinLogsData?.map((item) => (
                <ProfilePaymentsHistoryItem
                  key={Math.random()}
                  date={formatDate(item.created_at)}
                  value={item.aicoin}
                />
              ))}
              {true ? (
                <Button
                  type="primary"
                  block
                  style={{ backgroundColor: "rgb(80 80 80)" }}
                >
                  <LockOutlined />
                </Button>
              ) : (
                <Button type="primary" block>
                  Pay out
                </Button>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div
        className={activeButton === "referralBtn" ? "card active" : "card"}
        id="referral"
      >
        <div
          className="card__head-name"
          id="referralBtn"
          onClick={(e) => setActiveButton(e.target.id)}
        >
          Referral system
        </div>
        <div className="card__info">
          <div className="card__main-info">
            <div className="card__total-earnings">
              Total earnings: <span>{aicoin} AiCoin</span>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  top: "1px",
                  right: "1px",
                  position: "absolute",
                }}
              >
                <Popover
                  content="the total amount of AiCoin received by you from the new users invited by you for the whole period."
                  trigger="click"
                >
                  <ButtonForIcon
                    icon={
                      <InfoCircleOutlined
                        style={{ color: "#24A1E0", fontSize: "15px" }}
                      />
                    }
                  />
                </Popover>
              </div>
            </div>
            <div className="ref-link">
              Referral link:
              <div
                className="link"
                onClick={() => {
                  navigator.clipboard.writeText(
                    "https://ai-pro.company/" + user?.id
                  );
                  messageShow.info("Copy link!");
                }}
              >
                {user?.id}
              </div>
              <div className="popover-item">
                <CopyOutlined
                  style={{
                    fontSize: "15px",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      "https://ai-pro.company/" + user?.id
                    );
                    messageShow.info("Copy link!");
                  }}
                />
                <Popover
                  content="Invite new users through your link and receive 10% in AiCoin from each purchase by your invited users."
                  trigger="click"
                >
                  <ButtonForIcon
                    icon={
                      <InfoCircleOutlined
                        style={{ color: "#24A1E0", fontSize: "15px" }}
                      />
                    }
                  />
                </Popover>
              </div>
            </div>
          </div>
          <div className="card__table-wrap">
            <table className="card__table">
              <thead>
                <tr>
                  <th scope="col">Referral ID</th>
                  <th scope="col">Amount of earnings</th>
                </tr>
              </thead>
              <tbody>
                {clientData?.ClientReferralLogs?.map((item) => (
                  <ProfileReferalsHistoryItem
                    key={Math.random()}
                    value={item?.remuneration}
                    RefId={item?.authIdRegistered}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;

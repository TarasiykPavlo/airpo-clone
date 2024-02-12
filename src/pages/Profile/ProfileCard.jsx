import { useEffect, useState } from "react";
import { Button, message } from "antd";
import { InfoCircleOutlined, CopyOutlined } from "@ant-design/icons";

import ButtonForIcon from "../../ui/ButtonForIcon";
import ProfilePaymentsHistoryItem from "./ProfilePaymentsHistoryItem";
import ProfileReferralHistoryItem from "./ProfileReferralHistoryItem";
import { getDateAicoinHistory } from "../../utils/helpers";
import { useAuthClientData } from "../../features/authentication/useAuthClientData";
import { useAuthClient } from "../../features/authentication/useAuthClient";

function ProfileCard() {
  const { user } = useUser();
  const { fullName: name, email } = user.user_metadata;
  const { data: clientAicoinHistory } = useAuthClientData(user.id);

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
              <div className="title">Рersonal information</div>
              <div id="name" className="card__text">
                Name: {name}
              </div>
              <div id="email" className="card__text">
                Email: {email}
              </div>
              <ButtonForIcon
                icon={
                  <InfoCircleOutlined
                    style={{
                      color: "#24A1E0",
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                    }}
                  />
                }
              />
            </div>
            <div className="ref-link">
              Referral link:
              <div className="link">{userId}</div>
              <div className="ref-link-item">
                <CopyOutlined
                  style={{
                    fontSize: "15px",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(userId);
                    messageShow.info("Copy link!");
                  }}
                />
                <ButtonForIcon
                  icon={
                    <InfoCircleOutlined
                      style={{ color: "#24A1E0", fontSize: "15px" }}
                    />
                  }
                />
              </div>
            </div>
            <Button type="primary" className="btn-check" block>
              My applications
            </Button>
          </div>
          <div className="card__pay">
            <div className="title">
              Payments
              <div className="card__balance">Balance: {aicoin} AIC</div>
            </div>

            <ul className="card__history">
              {clientAicoinHistory.map((value, index) => (
                <ProfilePaymentsHistoryItem
                  key={Math.random()}
                  value={value}
                  date={
                    dates[index] ? getDateAicoinHistory(dates[index]) : "..."
                  }
                />
              ))}
              <Button type="primary" block>
                Pay out
              </Button>
            </ul>
          </div>
          {matches && (
            <Button
              type="primary"
              className="btn-check"
              style={{ display: "block" }}
              block
            >
              My applications
            </Button>
          )}
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
              <ButtonForIcon
                icon={
                  <InfoCircleOutlined
                    style={{ color: "#24A1E0", fontSize: "15px" }}
                  />
                }
              />
            </div>
            <div className="ref-link">
              Referral link:
              <div className="link">{userId}</div>
              <div className="ref-link-item">
                <CopyOutlined
                  style={{
                    fontSize: "15px",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(userId);
                    messageShow.info("Copy link!");
                  }}
                />
                <ButtonForIcon
                  icon={
                    <InfoCircleOutlined
                      style={{ color: "#24A1E0", fontSize: "15px" }}
                    />
                  }
                />
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
                {values.map((value) => (
                  <ProfileReferralHistoryItem
                    key={Math.random()}
                    value={value}
                    RefId={userId}
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

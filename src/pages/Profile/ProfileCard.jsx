import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import ProfilePaymentsHistoryItem from "./ProfilePaymentsHistoryItem";
import ButtonForIcon from "../../ui/ButtonForIcon";
import { InfoCircleOutlined, CopyOutlined } from "@ant-design/icons";

function ProfileCard({ userId, aicoin, name, email, clientAicoinHistory }) {
  const [activeButton, setActiveButton] = useState("personalBtn");
  const [messageShow, messageContext] = message.useMessage();

  const values = clientAicoinHistory?.aicoin || [0];
  const dates = clientAicoinHistory?.created_at || [];
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 1140px)").matches
  );
  function getDateAicoinHistory(date){
    const d = new Date(date);
    return d.getDate() + 'd-' + (d.getMonth()+1) + 'm-' + d.getFullYear() +"y"
  }
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
                Name: {name || "Name"}
              </div>
              <div id="email" className="card__text">
                Email: {email || "aipro@gmail.com"}
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
                    navigator.clipboard.writeText(
                      userId || "00000000-0000-0000-0000-000000000000"
                    );
                    infoMessage("Copy link!");
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
              {values.map((value, index) => (
                <ProfilePaymentsHistoryItem
                  key={Math.random()}
                  value={value}
                  date={dates[index]? getDateAicoinHistory(dates[index]) : "..."}
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
              <div className="link">
                {userId || "00000000-0000-0000-0000-000000000000"}
              </div>
              <div className="ref-link-item">
                <CopyOutlined
                  style={{
                    fontSize: "15px",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      userId || "00000000-0000-0000-0000-000000000000"
                    );
                    infoMessage("Copy link!");
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
                <tr>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>

                <tr>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  function infoMessage(message) {
    messageShow.info(message);
  }
}

export default ProfileCard;
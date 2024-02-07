import React, { useEffect, useState } from "react";
import { useUser } from "../../features/authentication/useUser";
import { useAuthClient } from "../../features/authentication/useAuthClient";
import ButtonForIcon from "../../ui/ButtonForIcon";
import { InfoCircleOutlined, CopyOutlined } from "@ant-design/icons";
import { Button } from "antd";
import ProfilePaymentsHistoryItem from "./ProfilePaymentsHistoryItem";

function ProfileCard() {
  const [activeButton, setActiveButton] = useState("personalBtn");
  const { user } = useUser();
  const { name, email } = user.user_metadata;
  const { id, aicoin } = useAuthClient(user.id);

  const values = [415, -154, 54, -48, 587];
  const dates = [
    "02 / 12 / 24",
    "04 / 12 / 24",
    "07 / 12 / 24",
    "15 / 12 / 24",
  ];

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
                Name: {name || "Mari_Petrovna"}
              </div>
              <div id="email" className="card__text">
                Email: {email || "MariPetrovna@gmail.com"}
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
              <div className="link">{user.id}</div>
              <div className="ref-link-item">
                <CopyOutlined
                  style={{
                    fontSize: "15px",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      user.id || "00000000-0000-0000-0000-000000000000"
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
              <div className="card__balance">Balance: {aicoin || "🚀"} AIC</div>
            </div>

            <ul className="card__history">
              {values.map((value, index) => (
                <ProfilePaymentsHistoryItem
                  key={Math.random()}
                  value={value}
                  date={dates[index] ? dates[index] : "Іди нахуй"}
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
              Total earnings: <span>{aicoin || "🚀"} AiCoin</span>
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
                {user.id || "00000000-0000-0000-0000-000000000000"}
              </div>
              <div className="ref-link-item">
                <CopyOutlined
                  style={{
                    fontSize: "15px",
                  }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      user.id ||
                        "http://fgfyjbkjguyfif66//00000000-0000-0000-0000-000000000000"
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
}

export default ProfileCard;
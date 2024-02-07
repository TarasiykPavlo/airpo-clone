import React from "react";
import "./Profile.scss";
import { Avatar, ConfigProvider, message, theme } from "antd";
import iconPencil from "./../../assets/pencil.svg";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import ButtonForIcon from "../../ui/ButtonForIcon";
import { useUser } from "../../features/authentication/useUser";
import { useAuthClient } from "../../features/authentication/useAuthClient";
import ProfileCard from "./ProfileCard";

import { getClientData } from "../../services/apiAuthClient";

function Profile() {
  const [messageShow, messageContext] = message.useMessage();
  const { user } = useUser();
  const { picture, name } = user.user_metadata;
  const { data: client } = useAuthClient(user.id);
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      {messageContext}
      <div className="wrapper">
        <div className="profile">
          <div className="profile__head">
            <div className="user-info">
              <div className="user-photo">
                {picture ? (
                  <Avatar src={picture} />
                ) : (
                  <Avatar icon={<UserOutlined />} />
                )}
                <div className="send-photo">
                  <input
                    type="file"
                    name="myImage"
                    id="sendPhoto"
                    onChange={(event) => {}}
                  />
                  <label htmlFor="sendPhoto">
                    <img src={iconPencil} />
                  </label>
                </div>
              </div>
              <div className="user-info__name">{name || "Masha Petrenko"}</div>
              <div className="user-info__balance">
                Вalance: {client?.aicoin} AiCoin
                <ButtonForIcon
                  icon={<InfoCircleOutlined style={{ color: "#24A1E0" }} />}
                />
              </div>
            </div>
          </div>
          <ProfileCard />
        </div>
      </div>
    </ConfigProvider>
  );

  function changeButtonActive(id) {
    setActiveButton(id);
  }
  function infoMessage(message) {
    messageShow.info(message);
  }
}

export default Profile;

import React, { useEffect, useState } from "react";
import "./Profile.scss";

import { Avatar, ConfigProvider, theme } from "antd";

import iconPencil from "./../../assets/pencil.svg";
import ButtonForIcon from "../../ui/ButtonForIcon";
import { Avatar, ConfigProvider, message, theme } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import { useUser } from "../../features/authentication/useUser";
import { useAuthClient } from "../../features/authentication/useAuthClient";
import { useAuthClientData } from "../../features/authentication/useAuthClientData";
import ProfileCard from "./ProfileCard";

function Profile() {
  const { user } = useUser();
  const { picture, name, email } = user.user_metadata;
  const { data: client } = useAuthClient(user.id);
  const { data: clientAicoinHistory } = useAuthClientData(user.id);
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
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
          <ProfileCard
            userId={user?.id}
            aicoin={client?.aicoin}
            name={name}
            email={email}
            clientAicoinHistory={clientAicoinHistory}
          />
        </div>
      </div>
    </ConfigProvider>
  );

  function changeButtonActive(id) {
    setActiveButton(id);
  }
}

export default Profile;

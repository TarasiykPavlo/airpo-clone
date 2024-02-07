import React from "react";
import "./Profile.scss";
import {  Avatar, ConfigProvider, theme } from "antd";
import iconPencil from "./../../assets/pencil.svg";
import {InfoCircleOutlined, UserOutlined } from "@ant-design/icons";
import ButtonForIcon from "../../ui/ButtonForIcon";
import { useUser } from "../../features/authentication/useUser";
import ProfileCard from "./ProfileCard";
function Profile() {
  const { user } = useUser();
  const { picture, name } = user.user_metadata;
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
                      <Avatar src={picture}/>
                    ): (
                      <Avatar icon={<UserOutlined/>}/>
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
                Вalance: {"0"} AiCoin
                <ButtonForIcon
                  icon={<InfoCircleOutlined style={{ color: "#24A1E0" }} />}
                />
              </div>
            </div>
          </div>
          <ProfileCard/>
        </div>
      </div>
    </ConfigProvider>
  );

  function changeButtonActive(id) {
    setActiveButton(id);
  }
}

export default Profile;

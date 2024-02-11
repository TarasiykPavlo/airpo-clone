import { Link } from "react-router-dom";
import { Avatar, ConfigProvider, Dropdown, Menu, Select, theme } from "antd";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import { useUser } from "../../features/authentication/useUser";
import { useLogout } from "../../features/authentication/useLogout";
import logo from "./../../assets/logo-icon.svg";
import "./Navigation.scss";
import { useEffect, useState } from "react";
import SubMenu from "antd/es/menu/SubMenu";
function Navigation({ logoItem }) {
  const { logout } = useLogout();
  const { user } = useUser();
  const { picture, name } = user.user_metadata;
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 640px)").matches
  );
  const [checkOpenDropmenuNavigation, setCheckOpenDropmenuNavigation] =
    useState(false);
  useEffect(() => {
    window
      .matchMedia("(max-width: 640px)")
      .addEventListener("change", (e) => setMatches(e.matches));
  }, []);
  const menu = (
    <Menu>
      <Menu.Item key="0" className="close-menu">
        <LeftOutlined /> Personal Area
      </Menu.Item>
      <div className="user-info">
        <div className="user-photo">
          {picture ? (
            <Avatar src={picture} className="user-photo__avatar" />
          ) : (
            <Avatar className="user-photo__avatar" icon={<UserOutlined />} />
          )}
        </div>
        <div className="user-info-main">
          <div className="user-info__name">{name}</div>
          <div className="user-info__balance">Вalance: {"0"} AiCoin</div>
        </div>
      </div>
      <Menu.Item key="1">AiPro</Menu.Item>
      <Menu.Item key="2">
        <Link to={"/profile"}>My account</Link>
      </Menu.Item>
      {matches ? (
        <>
          <Menu.Item key="3">
            <Link to={"/products"}>All applications</Link>
          </Menu.Item>
          <Menu.Item key="4">
            <Link>My applications</Link>
          </Menu.Item>
        </>
      ) : (
        <SubMenu key="3" title="Application">
          <Menu.Item key="3-3">
            <Link to={"/products"}>All applications</Link>
          </Menu.Item>
          <Menu.Item key="3-4">
            <Link>My applications</Link>
          </Menu.Item>
        </SubMenu>
      )}
      <Menu.Item onClick={logout} key="5">
        Logout
      </Menu.Item>
    </Menu>
  );
  if (checkOpenDropmenuNavigation) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
      }}
    >
      <nav className="nav">
        {logoItem && (
          <Link className="logo">
            AiPro <img src={logo} alt="Logo AiPro" />
          </Link>
        )}
        <div className="user">
          <Select
            defaultValue="En"
            className="change-lang"
            options={[
              {
                value: "Ua",
                label: "Ua",
              },
              {
                value: "En",
                label: "En",
              },
            ]}
          />
          <Dropdown
            overlayClassName="dropdown-menu"
            overlay={menu}
            onOpenChange={(e) => matches && setCheckOpenDropmenuNavigation(e)}
            placement={matches ? "bottom" : "bottomRight"}
            trigger={["click"]}
          >
            {matches ? (
              <div className="burger">
                <div className="burger-item"></div>
                <div className="burger-item"></div>
                <div className="burger-item"></div>
              </div>
            ) : picture ? (
              <Avatar className="avatar" src={picture} />
            ) : (
              <Avatar className="avatar" icon={<UserOutlined />} />
            )}
          </Dropdown>
        </div>
      </nav>
    </ConfigProvider>
  );
}

export default Navigation;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, ConfigProvider, Dropdown, Menu, Select, theme } from "antd";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";
import SubMenu from "antd/es/menu/SubMenu";

import { useUser } from "../../features/authentication/useUser";
import { useLogout } from "../../features/authentication/useLogout";
import logo from "./../../assets/logo-icon.svg";

import "./Navigation.scss";

function Navigation() {
	const { user } = useUser();
	const { logout } = useLogout();
	const { avatar, avatar_url, name } = user.user_metadata;

	const [isMenuActive, setIsMenuActive] = useState(false);
	const [matches, setMatches] = useState(
		window.matchMedia("(max-width: 640px)").matches
	);

	useEffect(() => {
		window
			.matchMedia("(max-width: 640px)")
			.addEventListener("change", (e) => setMatches(e.matches));
	}, []);

	document.body.style.overflow = isMenuActive ? "hidden" : "auto";

	const menu = (
		<Menu>
			<Menu.Item key="0" className="close-menu">
				<LeftOutlined /> Back
			</Menu.Item>
			<div className="user-info">
				<div className="user-photo">
					{avatar ? (
						<Avatar className='menu-avatar' src={avatar} />
					) : avatar_url ? (
						<Avatar className='menu-avatar'  src={avatar_url} />
					) : (
						<Avatar className='menu-avatar'  icon={<UserOutlined />} />
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
						<Link to={"/applications"}>My applications</Link>
					</Menu.Item>
				</>
			) : (
				<SubMenu key="3" title="Application">
					<Menu.Item key="3-3">
						<Link to={"/products"}>All applications</Link>
					</Menu.Item>
					<Menu.Item key="3-4">
						<Link to={"/applications"}>My applications</Link>
					</Menu.Item>
				</SubMenu>
			)}
			<Menu.Item onClick={logout} key="5">
				Logout
			</Menu.Item>
		</Menu>
	);

	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
			}}
		>
			<nav className="nav">
				<Link className="logo">
					AiPro <img src={logo} alt="Logo AiPro" />
				</Link>

				<div className="user" style={{ cursor: "pointer" }}>
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
						onOpenChange={(e) => matches && setIsMenuActive(e)}
						placement={matches ? "bottom" : "bottomRight"}
						trigger={["click"]}
					>
						{matches ? (
							<div className="burger">
								<div className="burger-item"></div>
								<div className="burger-item"></div>
								<div className="burger-item"></div>
							</div>
						) : avatar ? (
							<Avatar className='avatar'  src={avatar} />
						) : avatar_url ? (
							<Avatar className='avatar'  src={avatar_url} />
						) : (
							<Avatar className='avatar'  icon={<UserOutlined />} />
						)}
					</Dropdown>
				</div>
			</nav>
		</ConfigProvider>
	);
}

export default Navigation;

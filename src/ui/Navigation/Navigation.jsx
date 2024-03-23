import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar, ConfigProvider, Dropdown, Menu, Select, theme } from "antd";
import { LeftOutlined, UserOutlined } from "@ant-design/icons";

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
						<Avatar className="menu-avatar" src={avatar} />
					) : avatar_url ? (
						<Avatar className="menu-avatar" src={avatar_url} />
					) : (
						<Avatar className="menu-avatar" icon={<UserOutlined />} />
					)}
				</div>
				<div className="user-info-main">
					<div className="user-info__name">{name}</div>
					<div className="user-info__balance">Вalance: {"0"} AiCoin</div>
				</div>
			</div>
			<Menu.Item key="1">
				<Link to="https://ai-pro.company/">AiPro</Link>
			</Menu.Item>
			<Menu.Item key="2">
				<Link to={"/profile"}>My account</Link>
			</Menu.Item>
			<Menu.Item key="4">
				<Link to={"/products"}>Shop</Link>
			</Menu.Item>
			<Menu.Item key="5">
				<Link to={"/applications"}>My products</Link>
			</Menu.Item>
			<Menu.Item key="3">
				<Link to={"/faq"}>FAQ</Link>
			</Menu.Item>
			<Menu.Item onClick={logout} key="6">
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
				<Link to="/profile" className="logo">
					AiPro <img src={logo} alt="Logo AiPro" />
				</Link>

				<div className="user" style={{ cursor: "pointer" }}>
					<Select
						defaultValue="En"
						className="change-lang"
						options={[
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
							<Avatar className="avatar" src={avatar} />
						) : avatar_url ? (
							<Avatar className="avatar" src={avatar_url} />
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

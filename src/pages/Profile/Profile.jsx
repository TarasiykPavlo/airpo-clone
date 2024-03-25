import { Avatar, ConfigProvider, Popover, theme } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

import { useUser } from "../../features/authentication/useUser";
import { useUpdateUserAvatar } from "../../features/authentication/useUpdateUserAvatar";
import { useUpdateUserAicoin } from "../../features/authentication/useUpdateUserAicoin";

import ProfileCard from "./ProfileCard";

import iconPencil from "./../../assets/pencil.svg";
import ButtonForIcon from "../../ui/ButtonForIcon";

import "./Profile.scss";
import { useEffect } from "react";
import { createRef } from "../../services/apiAuthClient";

function Profile() {
	const { user } = useUser();
	const {
		aicoin,
		avatar,
		avatar_url,
		full_name: fullName,
		refLink
	} = user.user_metadata;
	const userId = user.id;
	const { updateUserAicoin } = useUpdateUserAicoin();
	const { updateUserAvatar, isUpdating } = useUpdateUserAvatar();

	useEffect(() => {
		if (typeof aicoin != Number) {
			updateUserAicoin(aicoin);
		}
	}, [aicoin]);

	if (refLink !== undefined) {
		createRef(userId, refLink);
	}

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
								{avatar ? (
									<Avatar src={avatar} />
								) : avatar_url ? (
									<Avatar src={avatar_url} />
								) : (
									<Avatar icon={<UserOutlined />} />
								)}
								<div className="send-photo">
									<input
										type="file"
										name="myImage"
										id="sendPhoto"
										accept="image/*"
										disabled={isUpdating}
										onChange={(e) => {
											var props = e.target.files[0];

											updateUserAvatar({ props, userId });
										}}
									/>
									<label htmlFor="sendPhoto">
										<img src={iconPencil} />
									</label>
								</div>
							</div>
							<div className="user-info__name">{fullName}</div>
							<div className="user-info__balance">
								Вalance: {aicoin}
								<Popover
									content="AiCoin is the internal currency of the site, for which you can purchase goods on the site or receive cashback when withdrawing AiCoin."
									trigger="click"
								>
									<ButtonForIcon
										icon={<InfoCircleOutlined style={{ color: "#24A1E0" }} />}
									/>
								</Popover>
							</div>
						</div>
					</div>

					<ProfileCard />
				</div>
			</div>
		</ConfigProvider>
	);
}

export default Profile;

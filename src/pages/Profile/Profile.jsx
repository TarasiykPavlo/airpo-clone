import { Avatar, ConfigProvider, theme } from "antd";
import { InfoCircleOutlined, UserOutlined } from "@ant-design/icons";

import { useUser } from "../../features/authentication/useUser";
import { useUpdateUser } from "../../features/authentication/useUpdateUser";
import { useAuthClient } from "../../features/authentication/useAuthClient";
import { useAuthClientData } from "../../features/authentication/useAuthClientData";

import ProfileCard from "./ProfileCard";

import iconPencil from "./../../assets/pencil.svg";
import ButtonForIcon from "../../ui/ButtonForIcon";

import "./Profile.scss";

function Profile() {
	const { user } = useUser();
	const { updateUser, isUpdating } = useUpdateUser();
	
	const { avatar, avatar_url, name, email } = user.user_metadata;
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
											updateUser(e.target.files[0]);
										}}
									/>
									<label htmlFor="sendPhoto">
										<img src={iconPencil} />
									</label>
								</div>
							</div>
							<div className="user-info__name">{name}</div>
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
}

export default Profile;

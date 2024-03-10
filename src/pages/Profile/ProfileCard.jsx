import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import { InfoCircleOutlined, CopyOutlined } from "@ant-design/icons";

import { useUser } from "../../features/authentication/useUser";
import { useAuthClient } from "../../features/authentication/useClientDataForProfile";

import ButtonForIcon from "../../ui/ButtonForIcon";
import ProfilePaymentsHistoryItem from "./ProfilePaymentsHistoryItem";
import ProfileReferalsHistoryItem from "./ProfileReferralHistoryItem";
import { formatDate } from "../../utils/helpers";

function ProfileCard() {
	const navigate = useNavigate();

	const { user } = useUser();
	const { aicoin, full_name: fullName } = user.user_metadata;
	const { data: clientData } = useAuthClient(user.id);
	const [activeButton, setActiveButton] = useState("personalBtn");
	const [messageShow, messageContext] = message.useMessage();

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
								Name: {fullName}
							</div>
							<div id="email" className="card__text">
								Email: {user?.email}
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
							<div className="link">{user?.id}</div>
							<div className="ref-link-item">
								<CopyOutlined
									style={{
										fontSize: "15px",
									}}
									onClick={() => {
										navigator.clipboard.writeText(user?.id);
										messageShow.info("Copy link!");
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
						<Button
							type="primary"
							className="btn-check"
							block
							style={{ display: "block" }}
							onClick={() => navigate("/applications")}
						>
							My applications
						</Button>
					</div>
					<div className="card__pay">
						<div className="title">
							Payments
							<div className="card__balance">Balance: {aicoin} AIC</div>
						</div>

						<ul className="card__history">
							{clientData?.ClientAicoinLogsData?.map((item) => (
								<ProfilePaymentsHistoryItem
									key={Math.random()}
									date={formatDate(item.created_at)}
									value={item.aicoin}
								/>
							))}
							<Button type="primary" block>
								Pay out
							</Button>
						</ul>
					</div>
					{/* {matches && (
						<Button
							type="primary"
							className="btn-check"
							style={{ display: "block" }}
							block
							onClick={() => navigate("/applications")}
						>
							My applications
						</Button>
					)} */}
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
							<div className="link">{user?.id}</div>
							<div className="ref-link-item">
								<CopyOutlined
									style={{
										fontSize: "15px",
									}}
									onClick={() => {
										navigator.clipboard.writeText(user?.id);
										messageShow.info("Copy link!");
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
								{clientData?.ClientReferralLogs?.map((item) => (
									<ProfileReferalsHistoryItem
										key={Math.random()}
										value={item?.remuneration}
										RefId={item?.authIdRegistered}
									/>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileCard;

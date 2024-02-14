import { useState } from "react";
import { Button } from "antd";

import { useMoveBack } from "../../hooks/useMoveBack";
import Input from "../../ui/Input/Input";

import "./BotSettings.scss";
import { ExclamationCircleFilled } from "@ant-design/icons";

const BotSettings = () => {
	const moveBack = useMoveBack();

	const [apiId, setApiId] = useState("548866468488664684");
	const [apiHash, setApiHash] = useState("5488dasd6646848866468adda");

	return (
		<main className="bot-settings">
			<div>
				<h1 className="application__title">Bot settings</h1>

				<div className="bot-settings__inputs-wrapper">
					<div>
						<p className="bot-settings__input-label">API ID</p>
						<Input
							maxLength={18}
							type="string"
							value={apiId}
							onChange={(e) => setApiId(e.target.value)}
						/>
					</div>

					<div>
						<p className="bot-settings__input-label">API HASH</p>
						<Input
							maxLength={25}
							type="string"
							value={apiHash}
							onChange={(e) => setApiHash(e.target.value)}
						/>
					</div>
				</div>

				<p className="application__link">Regenerate API ID, API HASH</p>

				<div className="application__tip-wrapper">
					<ExclamationCircleFilled className="application__tip-icon" />

					<p className="application__tip-text">
						Використання наших API ID, API HASH збільшує ймовірність бану. Щоб
						уникнути цього - створіть власні API ID та API HASH за допомогою
						документації.
					</p>
				</div>
			</div>

			<footer className="application__footer-buttons-wrapper">
				<Button block type="primary" size="large">
					Save
				</Button>

				<Button
					block
					size="large"
					onClick={moveBack}
					className="application__button--back"
				>
					Back
				</Button>
			</footer>
		</main>
	);
};

export default BotSettings;

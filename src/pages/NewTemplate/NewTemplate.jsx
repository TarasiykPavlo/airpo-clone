import { useState } from "react";
import { Button, Upload } from "antd";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Input from "../../ui/Input/Input";
import TextArea from "../../ui/TextArea";
import { useMoveBack } from "../../hooks/useMoveBack";

import "./NewTemplate.scss";
import InputRange from "../../ui/InputRange/InputRange";

const NewTemplate = () => {
	const moveBack = useMoveBack();

	const [templateName, setTemplateName] = useState("");

	const [messageInterval, setMessageInterval] = useState(20);
	const [mailingDelay, setMailingDelay] = useState(20);
	const [mailingStart, setMailingStart] = useState(20);

	const mainContent = (
		<>
			<Input
				placeholder="Enter name..."
				maxLength={20}
				type="string"
				value={templateName}
				onChange={(e) => setTemplateName(e.target.value)}
				style={{ marginBottom: "1rem" }}
			/>

			<TextArea
				style={{
					height: "10rem",
					resize: "none",
					marginBottom: "1rem",
				}}
			/>

			<Upload>
				<Button block size="large" className="application__button--black">
					Click to Upload
				</Button>
			</Upload>

			<div className="ranges-container">
				<div className="ranges-container__row">
					<p>Message sending interval</p>
					<InputRange value={messageInterval} setValue={setMessageInterval} />
				</div>

				<div className="ranges-container__row">
					<p>Delay between mailings</p>
					<InputRange value={mailingDelay} setValue={setMailingDelay} />
				</div>

				<div className="ranges-container__row">
					<p>Start before mailing</p>
					<InputRange value={mailingStart} setValue={setMailingStart} />
				</div>
			</div>
		</>
	);

	const footerContent = (
		<>
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
		</>
	);

	return (
		<>
			<ApplicationLayout
				title="Templates"
				mainContent={mainContent}
				footerContent={footerContent}
			/>
		</>
	);
};

export default NewTemplate;

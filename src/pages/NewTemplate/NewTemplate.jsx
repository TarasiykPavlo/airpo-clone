import { useState } from "react";
import { Button, Slider, Upload } from "antd";

import ApplicationLayout from "../../ui/ApplicationLayout";
import Input from "../../ui/Input/Input";
import TextArea from "../../ui/TextArea";
import { useMoveBack } from "../../hooks/useMoveBack";

import "./NewTemplate.scss";

const NewTemplate = () => {
	const moveBack = useMoveBack();

	const [templateName, setTemplateName] = useState("");

	const [messageInterval, setMessageInterval] = useState(20);

	const mainContent = (
		<>
			<Input
				placeholder="Enter name..."
				maxLength={20}
				type="string"
				value={templateName}
				onChange={(e) => setTemplateName(e.target.value)}
				style={{ marginBottom: "3rem" }}
			/>

			<TextArea
				style={{
					height: "15.1rem",
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
				<Slider
					value={messageInterval}
					onChange={setMessageInterval}
					tooltip={{
            open: true,
            placement: 'bottom'
					}}
				/>
			</div>
		</>
	);

	const footerContent = (
		<>
			<Button block type="primary" size="large">
				Create template
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

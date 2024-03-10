import { Spin } from "antd";

const ApplicationLayout = ({ title, mainContent, footerContent, showSpin }) => {
	if (showSpin) {
		return (
			<main className="application">
				<span
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translate(-50%, -50%)",
					}}
				>
					<Spin size="large" />
				</span>
			</main>
		);
	}

	return (
		<main className="application">
			<div>
				<h1 className="application__title">{title}</h1>

				{mainContent}
			</div>

			<footer className="application__footer">{footerContent}</footer>
		</main>
	);
};

export default ApplicationLayout;

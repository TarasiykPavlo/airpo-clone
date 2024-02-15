import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { MoreOutlined } from "@ant-design/icons";

import ApplicationLayout from "../../ui/ApplicationLayout";
import { useMoveBack } from "../../hooks/useMoveBack";

import "./Templates.scss";

const Templates = () => {
	const navigate = useNavigate();
	const moveBack = useMoveBack();

	const mainContent = (
		<section className="templates__list">
			<ul className="application__list">
				<li className="application__item">
					<div className="application__item-left">
						<span className="application__name">Template 1</span>
					</div>

					<div className="application__item-right">
						<MoreOutlined
							onClick={() => navigate("info")}
							className="application__more-icon"
						/>
					</div>
				</li>
				<li className="application__item">2</li>
				<li className="application__item">2</li>
				<li className="application__item">2</li>
				<li className="application__item">2</li>
				<li className="application__item">2</li>
				<li className="application__item">2</li>
				<li className="application__item">2</li>
				<li className="application__item">2</li>
				<li className="application__item">2</li>
				<li className="application__item">2</li>
				<li className="application__item">2</li>
				<li className="application__item">2</li>
			</ul>
		</section>
	);

	const footerContent = (
		<>
			<Button
				block
				type="primary"
				size="large"
				onClick={() => navigate("info")}
			>
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

export default Templates;

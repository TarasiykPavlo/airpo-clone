import { Button } from "antd";

import GroupItem from "../../ui/GroupItem";
import { useMoveBack } from "../../hooks/useMoveBack";

import "./GroupsSettings.scss";

const GroupsSettings = () => {
	const moveBack = useMoveBack();

	return (
		<main className="group-settings">
			<div>
				<h1 className="application__title">Groups settings</h1>

				<div
					className="application__info-wrapper"
					style={{ marginBottom: "1.5rem" }}
				>
					<div className="application__info-item">
						Region: <span>UA</span>
					</div>

					<div className="application__info-item">
						Category: <span>IT</span>
					</div>

					<div className="application__info-item">
						Total groups: <span>100</span>
					</div>
				</div>

				<p className="application__link">Change region / category</p>

				<div className="application__divider" />

				<Button block size="large" className="settings__choose-template">
					Add new group
				</Button>

				<div className="group-settings__groups-wrapper">
					<GroupItem />
					<GroupItem />
					<GroupItem />
					<GroupItem />
					<GroupItem />
					<GroupItem />
					<GroupItem />
					<GroupItem />
					<GroupItem />
					<GroupItem />
					<GroupItem />
					<GroupItem />
					<GroupItem />
					<GroupItem />
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

export default GroupsSettings;

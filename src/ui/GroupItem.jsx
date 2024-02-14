import Input from "./Input/Input";

const GroupItem = () => {
	return (
		<div className="group-settings__groups-item">
			<span>Group name / tag</span>

			<div className="group-settings__select-wrapper">
				<span>Priority:</span>
				<Input
					defaultValue={10}
					type="number"
					style={{ width: "7rem", border: "1px solid #fff" }}
				/>
			</div>
		</div>
	);
};

export default GroupItem;

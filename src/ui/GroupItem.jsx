import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm } from "antd";
import Input from "./Input/Input";

export function GroupItem({ groupName, tag, priority }) {
	return (
		<div className="group-settings__groups-item">
			<span>{groupName || tag}</span>

			<div className="group-settings__select-wrapper">
				<span>Priority:</span>
				<Input
					defaultValue={priority}
					type="number"
					style={{ width: "7rem", border: "1px solid #fff" }}
				/>
				<Popconfirm
					placement="leftBottom"
					title={"Are you sure to delete this group?"}
					description={"Delete group"}
					okText="Yes"
					cancelText="No"
				>
					<Button type="text">
						<DeleteOutlined />
					</Button>
				</Popconfirm>
			</div>
		</div>
	);
}

export default GroupItem;

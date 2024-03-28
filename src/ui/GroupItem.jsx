import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import Input from "./Input/Input";
import { delGroupinCompany } from "../services/apiAuthClient";

export function GroupItem({ groupName, tag, priority, groupId }) {
  const [prioritet, setPrioritet] = useState(priority);
  const [messageShow, messageContext] = message.useMessage();

  const handleChange = (e) => {
    let value = e.target.value.trim();
    if (value === "" || (parseInt(value) >= 0 && parseInt(value) <= 99)) {
      setPrioritet(value === "" ? null : parseInt(value));
    }
  };

  const handleClear = () => {
	messageShow.success(`delete ${tag}`)
    delGroupinCompany(groupId);
  };

  return (
    <div className="group-settings__groups-item">
      <span>{groupName || tag}</span>
      {messageContext}
      <div className="group-settings__select-wrapper">
        <span>Priority:</span>
        <Input
          value={prioritet === null ? "" : prioritet.toString()}
          type="Number"
          min={0}
          step={1}
          max={99}
          onChange={handleChange}
          style={{ width: "7rem", border: "1px solid #fff" }}
        />
        <Popconfirm
          placement="leftBottom"
          title={"Are you sure to delete this group?"}
          description={"Delete group"}
          onConfirm={handleClear}
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

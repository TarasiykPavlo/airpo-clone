import { useLocation, useNavigate } from "react-router-dom";
import { Button, ConfigProvider, Modal, Select, Spin, theme, Input, Typography } from "antd";

import ApplicationLayout from "../../ui/ApplicationLayout";
import GroupItem from "../../ui/GroupItem";
import { useMoveBack } from "../../hooks/useMoveBack";

import "./GroupsSettings.scss";
import { useCompanyGroupsData } from "../../features/authentication/useCompanyGrupeData";
import { useState } from "react";
import { selectRegion, selectCategory } from "../../utils/constants";

const GroupsSettings = () => {
	const moveBack = useMoveBack();
	const navigate = useNavigate();
	const location = useLocation();
	const [region, setRegion] = useState("EU");
	const [category, setCategory] = useState("IT");
	const [
		isModalOpenChangeCategoryOrRegion,
		setIsModalOpenChangeCategoryOrRegion,
	] = useState(false);
	const [isModalOpenCreateGroup, setIsModalOpenCreateGroup] = useState(false);
	const [isSelectRegionActive, setIsSelectRegionActive] = useState(false);
	const [isSelectCategoryActive, setIsSelectCategoryActive] = useState(false);
	const showModal = () => {
		setIsModalOpenChangeCategoryOrRegion(true);
	};
	const handleOk = () => {
		setIsModalOpenChangeCategoryOrRegion(false);
	};
	const handleCancel = () => {
		setIsModalOpenChangeCategoryOrRegion(false);
	};

	const { data: groups } = useCompanyGroupsData(location?.state?.companyId);

	function saveGroupsChange() {
		navigate("/applications/settings", {
			state: {
				companyId: location?.state?.companyId,
				companyName: location?.state?.companyName,
			},
		});
	}

	const mainContent = (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
			}}
		>
			<div
				className="application__info-wrapper"
				style={{ marginBottom: "1.5rem" }}
			>
				<div className="application__info-item">
					Region: <span>{location?.state?.region}</span>
				</div>

				<div className="application__info-item">
					Category: <span>{location?.state?.сategories}</span>
				</div>

				<div className="application__info-item">
					Total groups:{" "}
					<span>{groups === undefined ? <Spin /> : groups?.length}</span>
				</div>
			</div>

			<div
				onClick={() => setIsModalOpenChangeCategoryOrRegion(true)}
				className="application__link"
			>
				Change region / category
			</div>
			<Modal
				title="Change region & category"
				open={isModalOpenChangeCategoryOrRegion}
				onOk={handleOk}
				onCancel={handleCancel}
			>
				<div className="new-application__selects-wrapper">
					<span className="new-application__select-title">Region:</span>
					<Select
						defaultValue={region ? region : null}
						placeholder="Select region..."
						options={selectRegion}
						isActive={isSelectRegionActive}
						setIsActive={setIsSelectRegionActive}
						onChange={(value) => setRegion(value)}
						size="medium"
					/>

					<span className="new-application__select-title">Category:</span>
					<Select
						defaultValue={category ? category : null}
						placeholder="Select category..."
						options={selectCategory}
						isActive={isSelectCategoryActive}
						setIsActive={setIsSelectCategoryActive}
						onChange={(value) => setCategory(value)}
						size="medium"
					/>
				</div>
			</Modal>

			<div className="application__divider mb-3" />

			<Button
				onClick={() => setIsModalOpenCreateGroup(true)}
				block
				size="large"
				className="application__button--black"
			>
				Add new group
			</Button>
			<Modal
				title="Create Group"
				open={isModalOpenCreateGroup}
				onOk={() => setIsModalOpenCreateGroup(false)}
				onCancel={() => setIsModalOpenCreateGroup(false)}
			>
				<br />
				<div>
					<Typography.Title level={5}>Name Group</Typography.Title>
					<Input placeholder="name group"></Input>
				</div>
				<br />
			</Modal>
			<div className="group-settings__groups-wrapper">
				{groups?.map((item) => (
					<GroupItem
						key={Math.random()}
						groupName={item.name}
						tag={item.tag}
						priority={item.priority}
					/>
				))}
			</div>
		</ConfigProvider>
	);

	const footerContent = (
		<>
			<Button block type="primary" size="large" onClick={saveGroupsChange}>
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
		<ApplicationLayout
			title="Groups settings"
			mainContent={mainContent}
			footerContent={footerContent}
		/>
	);
};

export default GroupsSettings;

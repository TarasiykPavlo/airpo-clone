import { useState } from "react";

import Select from "../../ui/Select/Select";
import { selectRegion, selectCategory } from "../../utils/constants";

import "./NewApplication.scss";
import Input from "../../ui/Input/Input";

const NewApplication = () => {
	const [isSelectRegionActive, setIsSelectRegionActive] = useState(false);
	const [isSelectCategoryActive, setIsSelectCategoryActive] = useState(false);

	function handleSelect(value) {
		console.log(value);
	}

	return (
		<main className="new-application">
			<h1 className="application__title">Create company</h1>
			<Input placeholder="Enter name..." maxLength={20} type="string" />

			<div className="new-application__selects-wrapper">
				<span className="new-application__select-title">Region:</span>
				<Select
					placeholder="Select region..."
					options={selectRegion}
					isActive={isSelectRegionActive}
					setIsActive={setIsSelectRegionActive}
					onChange={handleSelect}
				/>

				<span className="new-application__select-title">Category:</span>
				<Select
					placeholder="Select category..."
					options={selectCategory}
					isActive={isSelectCategoryActive}
					setIsActive={setIsSelectCategoryActive}
					onChange={handleSelect}
				/>
			</div>

			<footer className="new-application__footer"></footer>
		</main>
	);
};

export default NewApplication;

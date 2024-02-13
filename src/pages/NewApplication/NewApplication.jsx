import { useState } from "react";
import { Button, Tooltip } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { PhoneInput } from "react-international-phone";

import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";

import { useMoveBack } from "../../hooks/useMoveBack";
import { validatePhone } from "../../utils/helpers";
import { selectRegion, selectCategory } from "../../utils/constants";

import "react-international-phone/style.css";
import "./NewApplication.scss";

const NewApplication = () => {
	const moveBack = useMoveBack();

	const [companyName, setCompanyName] = useState("");
	const [region, setRegion] = useState("");
	const [category, setCategory] = useState("");
	const [phone, setPhone] = useState("");
	const isPhoneValid = validatePhone(phone);

	const [isSelectRegionActive, setIsSelectRegionActive] = useState(false);
	const [isSelectCategoryActive, setIsSelectCategoryActive] = useState(false);
	const [isNextHovered, setIsNextHovered] = useState(false);

	function handleNext() {
		if (!isPhoneValid) return;

		const companyData = {
			name: companyName,
			region,
			category,
			phone,
		};

		console.log(companyData);
	}

	return (
		<main className="new-application">
			<div>
				<h1 className="application__title">Create company</h1>
				<Input
					placeholder="Enter name..."
					maxLength={20}
					type="string"
					value={companyName}
					onChange={(e) => setCompanyName(e.target.value)}
				/>

				<div className="new-application__selects-wrapper">
					<span className="new-application__select-title">Region:</span>
					<Select
						placeholder="Select region..."
						options={selectRegion}
						isActive={isSelectRegionActive}
						setIsActive={setIsSelectRegionActive}
						onChange={(value) => setRegion(value)}
						size="medium"
					/>

					<span className="new-application__select-title">Category:</span>
					<Select
						placeholder="Select category..."
						options={selectCategory}
						isActive={isSelectCategoryActive}
						setIsActive={setIsSelectCategoryActive}
						onChange={(value) => setCategory(value)}
						size="medium"
					/>
				</div>

				<div className="new-application__phone-wrapper">
					<span className="new-application__phone-title">
						Enter phone (Telegram):
					</span>

					<PhoneInput
						defaultCountry="ua"
						value={phone}
						onChange={(phone) => setPhone(phone)}
					/>

					<div className="new-application__tip-wrapper">
						<ExclamationCircleFilled className="new-application__tip-icon" />

						<p className="new-application__tip-text">
							Не використовуйте свій основний акаунт телеграм, оскільки завжди є
							ризики бану акаунта!
						</p>
					</div>
				</div>
			</div>

			<footer className="new-application__footer">
				<p className="new-application__footer-text">
					Якщо у вас немає резервного акаунту телеграм - ви можете його{" "}
					<span>купити на сайті</span>
				</p>

				<div className="new-application__footer-button-wrapper">
					<Tooltip
						placement="top"
						title="Please enter valid phone"
						color="#4CBDED"
						// onOpenChange={(open) => console.log(open)}
						open={isNextHovered && !isPhoneValid}
					>
						<Button
							block
							type="primary"
							size="large"
							onClick={handleNext}
							onMouseEnter={() => setIsNextHovered(true)}
							onMouseLeave={() => setIsNextHovered(false)}
						>
							Next
						</Button>
					</Tooltip>

					<Button block size="large" className="button_back" onClick={moveBack}>
						Back
					</Button>
				</div>
			</footer>
		</main>
	);
};

export default NewApplication;

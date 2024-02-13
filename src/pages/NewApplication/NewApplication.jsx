import { useState } from "react";
import { Button } from "antd";
import { ExclamationCircleFilled } from "@ant-design/icons";
import { PhoneInput } from "react-international-phone";
import { PhoneNumberUtil } from "google-libphonenumber";

import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";

import { useMoveBack } from "../../hooks/useMoveBack";
import { selectRegion, selectCategory } from "../../utils/constants";

import "react-international-phone/style.css";
import "./NewApplication.scss";

const NewApplication = () => {
	const moveBack = useMoveBack();

	const [isSelectRegionActive, setIsSelectRegionActive] = useState(false);
	const [isSelectCategoryActive, setIsSelectCategoryActive] = useState(false);

	const [phone, setPhone] = useState("");

	const phoneUtil = PhoneNumberUtil.getInstance();
	const isValid = isPhoneValid(phone);
	console.log(isValid);

	function isPhoneValid(phone) {
		try {
			return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
		} catch (error) {
			return false;
		}
	}

	function handleSelect(value) {
		console.log(value);
	}

	return (
		<main className="new-application">
			<div>
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
						size="medium"
					/>

					<span className="new-application__select-title">Category:</span>
					<Select
						placeholder="Select category..."
						options={selectCategory}
						isActive={isSelectCategoryActive}
						setIsActive={setIsSelectCategoryActive}
						onChange={handleSelect}
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
					<Button block type="primary" size="large">
						Next
					</Button>

					<Button block size="large" className="button_back" onClick={moveBack}>
						Back
					</Button>
				</div>
			</footer>
		</main>
	);
};

export default NewApplication;

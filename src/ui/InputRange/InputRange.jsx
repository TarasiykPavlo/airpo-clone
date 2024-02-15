import { useState } from "react";

import "./InputRange.scss";
import { formatTimer } from "../../utils/helpers";

const InputRange = () => {
	const [value, setValue] = useState(90);

	const translateX = `translateX(calc(-${value}%)`;

	return (
		<div className="input__wrapper">
			<input
				type="range"
				min={1}
				max={99}
				step={1}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="input--range"
			/>

			<div
				className="input--range-value"
				style={{
					left: `${value}%`,
					transform: translateX,
				}}
			>
				{formatTimer(value)} sec
			</div>
		</div>
	);
};

export default InputRange;

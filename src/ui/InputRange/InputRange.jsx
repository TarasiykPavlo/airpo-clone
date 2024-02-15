import "./InputRange.scss";
import { formatTimer } from "../../utils/helpers";

const InputRange = ({ value, setValue }) => {
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
					transform: `translateX(-${value}%)`,
				}}
			>
				{formatTimer(value)} sec
			</div>
		</div>
	);
};

export default InputRange;

import "./InputRange.scss";
import { formatTimer } from "../../utils/helpers";

const InputRange = ({ value, setValue, min, max, step }) => {
	return (
		<div className="input__wrapper">
			<input
				type="range"
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className="input--range"
			/>

			{/* <div
				className="input--range-value"
				style={{
					left: `${value}%`,
					transform: `translateX(-${value}%)`,
				}}
			>
				{formatTimer(value)} sec
			</div> */}
		</div>
	);
};

export default InputRange;

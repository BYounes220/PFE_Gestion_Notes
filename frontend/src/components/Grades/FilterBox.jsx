import { useState, useEffect } from "react";
import resetIcon from "../../assets/reset.svg";
function FilterBox() {
	const [options, setOptions] = useState({
		year: "",
		option: "",
		oper: "",
		value: "",
	});
	const handleChangeField = (e) => {
		const parm = {
			...options,
			option: e.target.value,
		};
		setOptions(parm);
	};
	const handleChangeOperand = (e) => {
		const parm = {
			...options,
			oper: e.target.value,
		};
		setOptions(parm);
	};
	const handleChangeValue = (e) => {
		const parm = {
			...options,
			value: e.target.value,
		};
		setOptions(parm);
	};
	const reset = () => {
		const parm = {
			...options,
			option: "Choisissez un champ",
			oper: "opérande",
			value: "",
		};
		setOptions(parm);
	};
	const handleChangeYear = (e) => {
		const parm = {
			...options,
			year: e.target.value,
		};
		setOptions(parm);
	};

	const filter = () => {};

	useEffect(() => {
		console.log(options);
	}, [options]);

	return (
		<div className="w-3/5 bg-[#F9E79F]  pt-2 pb-2 right-0 shadow-[#F9E79F] shadow-sm space-y-6 rounded-md absolute z-10 ">
			<div className="flex flex-row justify-between p-1 pr-2 ">
				<p>
					<strong>Année académique</strong>
				</p>
				<input
					placeholder="yyyy-yyyy"
					className="rounded-md p-2 bg-[#A2CFFE] text-black"
					value={options.year}
					onChange={handleChangeYear}
				/>
			</div>
			<div className="flex flex-col p-2 bg-[#FFB84D] shadow-sm shadow-[#FFB84D]">
				<p>
					<strong>les filtres</strong>
				</p>
				<div className="flex flex-row justify-evenly mt-1">
					<select
						onChange={handleChangeField}
						value={options.option}
						className="rounded-md p-2 bg-[#A2CFFE]"
					>
						<option>Choisissez un champ</option>
						<option>le nom</option>
						<option>note ordiniaire</option>
						<option>note rattrapage</option>
						<option>validation</option>
					</select>
					<select
						className="rounded-md p-2 bg-[#A2CFFE]"
						value={options.oper}
						onChange={handleChangeOperand}
					>
						<option>opérande</option>
						{options.option === "note ordiniaire" ||
						options.option === "note rattrapage" ? (
							<>
								<option>égale</option>
								<option>moins que</option>
								<option>moins que ou égale</option>
								<option>plus que</option>
								<option>plus ou égale</option>
							</>
						) : (
							<>
								<option>égale</option>
								<option>contient</option>
								<option>pas égal</option>
							</>
						)}
					</select>
					<input
						className="w-26 rounded-md p-2 bg-[#A2CFFE] outline-none"
						value={options.value}
						onChange={handleChangeValue}
					/>
					<button
						className={`h-9 w-10 flex justify-center items-center bg-[#A2CFFE] rounded-md  `}
						onClick={reset}
					>
						<img
							src={resetIcon}
							alt="reset Icon"
							className="w-5 h-5"
						/>
					</button>
				</div>
			</div>
			<div className="flex flex-row pb-2 pr-2">
				<button
					onClick={filter}
					className="bg-orange-400 p-2  rounded-md ml-auto"
				>
					appliquer le filtre
				</button>
			</div>
		</div>
	);
}
export default FilterBox;

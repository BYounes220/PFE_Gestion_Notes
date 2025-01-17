import { useState, useEffect } from "react";
import resetIcon from "../../assets/reset.svg";
function FilterBox({ setSearchedEvaluations, allEvaluations, elementName }) {
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

	const filter = (e) => {
		e.preventDefault();
		let found = false;
		const evs = [];
		const opt = options;
		let year = opt.year;
		let yearWasNull = false;

		if (
			(opt.option == "" || opt.option == "Choisissez un champ") &&
			opt.value == "" &&
			(opt.oper == "" || opt.oper == "opérande") &&
			opt.year != ""
		) {
			allEvaluations.forEach((element) => {
				if (element.annee_academique == opt.year) {
					evs.push(element);
					found = true;
				}
			});
		}

		if (
			(opt.option != "" || opt.option != "Choisissez un champ") &&
			opt.value != "" &&
			(opt.oper != "" || opt.oper != "opérande")
		) {
			allEvaluations.forEach((element) => {
				if (year == "" || yearWasNull) {
					year = element.annee_academique;
					yearWasNull = true;
				}
				if (
					element.annee_academique == year &&
					element.nom_element === elementName
				) {
					switch (opt.option) {
						case "le nom":
							if (
								opt.oper == "égale" &&
								element.full_name_etudiant == opt.value
							) {
								evs.push(element);
								found = true;
							} else if (
								opt.oper == "pas égal" &&
								element.full_name_etudiant != opt.value
							) {
								evs.push(element);
								found = true;
							} else if (
								opt.oper == "contient" &&
								element.full_name_etudiant.includes(opt.value)
							) {
								evs.push(element);
								found = true;
							}
							break;
						case "note ordinaire":
							if (
								opt.oper == "égale" &&
								element.note_ordinaire == Number(opt.value)
							) {
								evs.push(element);
								found = true;
							} else if (
								opt.oper == "pas égal" &&
								element.note_ordinaire != Number(opt.value)
							) {
								evs.push(element);
								found = true;
							} else if (
								opt.oper == "moins que" &&
								element.note_ordinaire < Number(opt.value)
							) {
								evs.push(element);
								found = true;
							} else if (
								opt.oper == "moins que ou égale" &&
								element.note_ordinaire <= Number(opt.value)
							) {
								evs.push(element);
								found = true;
							} else if (
								opt.oper == "plus que" &&
								element.note_ordinaire > Number(opt.value)
							) {
								evs.push(element);
								found = true;
							} else if (
								opt.oper == "plus ou égale" &&
								element.note_ordinaire >= Number(opt.value)
							) {
								evs.push(element);
								found = true;
							}
							break;
						case "note rattrapage":
							if (element.note_rattrapage == null) {
								console.log("rt");
								break;
							}
							console.log("test");
							console.log(element);

							if (
								opt.oper == "égale" &&
								element.note_rattrapage == Number(opt.value)
							) {
								evs.push(element);
								found = true;
							} else if (
								opt.oper == "pas égal" &&
								element.note_rattrapage != Number(opt.value)
							) {
								evs.push(element);
								found = true;
							} else if (
								opt.oper == "moins que" &&
								element.note_rattrapage < Number(opt.value)
							) {
								evs.push(element);
								found = true;
							} else if (
								opt.oper == "moins que ou égale" &&
								element.note_rattrapage <= Number(opt.value)
							) {
								evs.push(element);
								found = true;
							} else if (
								opt.oper == "plus que" &&
								element.note_rattrapage > Number(opt.value)
							) {
								evs.push(element);
								found = true;
							} else if (
								opt.oper == "plus ou égale" &&
								element.note_rattrapage >= Number(opt.value)
							) {
								evs.push(element);
								found = true;
							}
							break;
						default:
							break;
					}
				}
			});
			if (!found) alert("no evalautions trouvées");
			else setSearchedEvaluations(evs);
		}
	};

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
						<option>note ordinaire</option>
						<option>note rattrapage</option>
						<option>validation</option>
					</select>
					<select
						className="rounded-md p-2 bg-[#A2CFFE]"
						value={options.oper}
						onChange={handleChangeOperand}
					>
						<option>opérande</option>
						{options.option === "note ordinaire" ||
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

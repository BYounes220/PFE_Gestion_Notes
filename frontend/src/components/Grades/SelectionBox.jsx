import { use } from "react";
import { useState } from "react";

function SelectionBox({ setPicked, setChoice }) {
	const [departments, setDepartments] = useState([
		{ name: "informatique" },
		{ name: "Tm" },
	]);
	const [branches, setBranches] = useState([
		{ name: "genie informatique" },
		{ name: "DWM" },
	]);
	const [selectedDep, setDep] = useState("");
	const [selectedBranch, setBranch] = useState("");
	const handleChangeDep = (e) => {
		let val = e.target.value;
		setDep(val);
		if (val != "") {
			console.log(val);
			setChoice((p) => ({
				...p,
				first: val,
			}));
		} else {
			console.log(val);
			setPicked(false);
		}
	};
	const handleBranchChange = (e) => {
		let val = e.target.value;
		setBranch(val);
		if (val != "") {
			console.log(val);
			setPicked(true);
			setChoice((p) => ({
				...p,
				second: val,
			}));
		} else {
			console.log(val);
			setPicked(false);
		}
	};

	return (
		<div className="flex flex-col items-center gap-2 p-4 mt-3 w-11/12 md:h-52 bg-gradient-to-r from-orange-500 to-blue-600 rounded-xl shadow-lg ">
			<h1 className="text-white  font-bold text-3xl">
				Portail d'affectation des enseignants
			</h1>
			<p className="text-gray-100">
				Sélectionnez le département et la filière pour commencer
				l'affectation
			</p>
			<div className="flex gap-3 w-11/12 justify-center mt-4 text-gray-100">
				<select
					className="rounded-lg p-2 w-1/2  bg-white/10 border border-gray-300 backdrop-blur-sm"
					value={selectedDep}
					onChange={handleChangeDep}
				>
					<option value="">Sélectionnze le département</option>
					{departments.map((d) => (
						<option value={d.name}>{d.name}</option>
					))}
				</select>
				<select
					className="rounded-lg p-2 w-1/2 bg-white/10 border border-gray-300 backdrop-blur-sm"
					value={selectedBranch}
					onChange={handleBranchChange}
				>
					<option value="">Sélectionnze la filière</option>
					{branches.map((b) => (
						<option value={b.name}>{b.name}</option>
					))}
				</select>
			</div>
		</div>
	);
}
export default SelectionBox;

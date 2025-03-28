import { use } from "react";
import { useState, useEffect } from "react";
import api from "../../api";
function SelectionBox({ setPicked, setAllTeachers, setElements }) {
	const [departments, setDepartments] = useState([]);
	const [branches, setBranches] = useState([]);
	const [selectedDep, setDep] = useState("");
	const [selectedBranch, setBranch] = useState("");

	useEffect(() => {
		const fetchDepartments = async () => {
			try {
				const res = await api.get("/Grades/listDepartments/");
				const data = Array.isArray(res.data) ? res.data : [res.data];
				setDepartments(data);
				console.log(data);
			} catch (error) {
				console.log("error in fetching of departments");
			}
		};
		fetchDepartments();
	}, []);

	const handleChangeDep = (e) => {
		let val = e.target.value;
		setDep(val);
		if (val != "") {
			console.log(val);
			const fetchFilieres = async () => {
				try {
					const res = await api.get("/Grades/listFilieres/", {
						params: {
							department: val,
						},
					});
					const data = Array.isArray(res.data)
						? res.data
						: [res.data];
					setBranches(data);
				} catch (error) {
					console.log("fetching filieres errors");
				}
			};
			fetchFilieres();
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
			const fetchTeachers = async () => {
				try {
					const res = await api.get(
						"/Grades/listDepartmentTeachers/",
						{
							params: {
								department: selectedDep,
							},
						}
					);
					const data = Array.isArray(res.data)
						? res.data
						: [res.data];
					setAllTeachers(data);
				} catch (error) {
					console.log("error in fetching teachers");
				}
			};
			const fetchElements = async () => {
				try {
					const res = await api.get("/Grades/listFiliereElements/", {
						params: {
							filiere: val,
						},
					});
					const data = Array.isArray(res.data)
						? res.data
						: [res.data];
					data.map((v) => (v.assignedTeachers = []));
					setElements(data);
				} catch (error) {
					console.log("error in fetching teachers");
				}
			};
			fetchTeachers();
			fetchElements();
		} else {
			console.log(val);
			setPicked(false);
		}
	};

	return (
		<div className="flex flex-col items-center gap-2 p-4 mt-3 w-11/12 md:h-52 bg-gradient-to-r from-blue-400 to-blue-600 rounded-xl shadow-lg ">
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
						<option
							value={d.nom_departement}
							className="text-black"
						>
							{d.nom_departement}
						</option>
					))}
				</select>
				<select
					className="rounded-lg p-2 w-1/2 bg-white/10 border border-gray-300 backdrop-blur-sm"
					value={selectedBranch}
					onChange={handleBranchChange}
				>
					<option value="">Sélectionnze la filière</option>
					{branches.map((b) => (
						<option value={b.nom_filiere} className="text-black">
							{b.nom_filiere}
						</option>
					))}
				</select>
			</div>
		</div>
	);
}
export default SelectionBox;

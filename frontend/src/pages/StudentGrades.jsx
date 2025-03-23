import { useEffect, useState } from "react";
import GradesHeader from "../components/Grades/GradesHeader";

export default function StudentGrades() {
	const [semesters, setSemesters] = useState();
	const [pickedSemester, setSemester] = useState("");
	const [studentSemesterGrades, setGrades] = useState();
	const [average, setAverage] = useState(14);
	useEffect(() => {
		//
	}, []);

	const handleSelectChange = (e) => {
		let val = e.target.value;
		console.log(val);
		if (val === "") {
			setSemester("");
		} else {
			setSemester(val);
		}
	};

	const ElementGradesBox = ({ name, ordinary, catch_up, result }) => {
		return (
			<div className="flex flex-col md:flex-row  w-11/12 md:h-[90px] h-32 gap-3 bg-white shadow-lg md:items-center p-8 rounded-lg">
				<h1 className="font-bold text-xl">{name}</h1>
				<div className="flex gap-2 md:ml-auto">
					<div className="w-40 h-10 rounded-2xl bg-gray-100 p-2 flex items-center justify-center gap-5">
						<div className="text-gray-600">
							Ordinaire:
							<span className="text-gray-900 font-bold pl-4">
								{ordinary}/20
							</span>
						</div>
					</div>
					<div className="w-40 h-10 rounded-xl bg-blue-100 p-2 flex items-center justify-center">
						<div className="text-blue-600">
							Rattrapage:
							<span className="text-blue-900 font-bold pl-4">
								{ordinary}/20
							</span>
						</div>
					</div>
					{result === "VAL" ? (
						<div className="w-20 h-10 rounded-xl bg-green-100 p-2 flex items-center justify-center">
							<div className="text-green-600">{result}</div>
						</div>
					) : result === "NV" ? (
						<div className="w-20 h-10 rounded-xl bg-red-100 p-2 flex items-center justify-center">
							<div className="text-red-600">{result}</div>
						</div>
					) : null}
				</div>
			</div>
		);
	};

	const AverageBox = ({ average }) => {
		return (
			<div className="flex flex-col md:flex-row  w-11/12 md:h-[90px] h-32 gap-3 bg-gradient-to-r from-yellow-400 to-orange-500 shadow-lg md:items-center p-8 rounded-lg">
				<h1 className="font-bold text-2xl text-white">
					Moyenne Semestre
				</h1>
				<div className="flex gap-2 md:ml-auto font-bold text-2xl text-white">
					{average}/20
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col gap-7 min-h-screen w-screen items-center bg-gray-50">
			<GradesHeader></GradesHeader>
			<div className="flex flex-col gap-4 p-8 w-11/12 mb-10 h-[250px] md:h-[220px]  bg-gradient-to-r from-sky-400 to-orange-400  rounded-lg shadow-2xl ">
				<p className="font-bold text-white text-center text-3xl">
					Résultats scolaires
				</p>
				<p className="text-center text-white lg:w-2/3 ml-auto mr-auto text-lg">
					Sélectionnez un semestre pour consulter vos résultats
					scolaires
				</p>
				<select
					className="h-12 w-11/12  md:w-[452px] rounded-2xl ml-auto mr-auto pl-4"
					onChange={handleSelectChange}
				>
					<option value="">Sélectionner Semestre</option>
					<option value="s1">s1</option>
				</select>
			</div>
			{pickedSemester && (
				<div className="w-screen flex flex-col items-center gap-4 mb-5">
					<ElementGradesBox
						name={"java"}
						ordinary={11}
						catch_up={12}
						result={"VAL"}
					></ElementGradesBox>
					<ElementGradesBox
						name={"linux"}
						ordinary={14}
						catch_up={10}
						result={"VAL"}
					></ElementGradesBox>
					<ElementGradesBox
						name={"c++"}
						ordinary={11}
						catch_up={11}
						result={"NV"}
					></ElementGradesBox>
					{!isNaN(average) && (
						<AverageBox average={average}></AverageBox>
					)}
				</div>
			)}
		</div>
	);
}

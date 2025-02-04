import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchIcon from "../../assets/icons8-search.svg";
import LOGO_EST from "../../assets/LOGO_EST.png";
import filterIcon from "../../assets/filter.svg";
import api from "../../api";
import Evaluations from "./Evaluations";
import ExcelJS from "exceljs";

function GradesHeader({
	setSearchedEvaluations,
	evaluations,
	elementName,
	filter,
	setFilter,
}) {
	const [searchTerm, setSearchTerm] = useState("");
	const [uploading, setUploading] = useState(false);
	const [file, setFile] = useState("");
	const navigate = useNavigate();

	const handleSearch = (e) => {
		const term = e.target.value;
		setSearchTerm(term);
		
		if (term.trim() === "") {
			setSearchedEvaluations([]);
		} else {
			const filtered = evaluations.filter((evaluation) =>
				evaluation.cne_etudiant.toLowerCase().includes(term.toLowerCase())
			);
			setSearchedEvaluations(filtered);
		}
	};

	const Filter = (e) => {
		if (filter) setFilter(false);
		else setFilter(true);
	};

	useEffect(() => {
		if (file) {
			Import(file);
			console.log(file);
		}
	}, [file]);

	const Import = async (file) => {
		const workBook = new ExcelJS.Workbook();
		const reader = new FileReader();

		reader.onload = async (e) => {
			const arrayBuffer = e.target.result;

			await workBook.xlsx.load(arrayBuffer);

			const worksheet = workBook.worksheets[0];
			const importedEvaluations = [];
			const meta = {
				annee_academique: worksheet.getRow(1).getCell(3).value,
				element: elementName.id,
			};

			worksheet.eachRow((row, rowNumber) => {
				if (rowNumber > 3)
					importedEvaluations.push({
						note_ordinaire: row.getCell(2).value,
						note_rattrapage: row.getCell(3).value,
						etudiant: row.getCell(1).value,
						element: meta.element,
						annee_academique: meta.annee_academique,
					});
			});
		};
		reader.readAsArrayBuffer(file);
	};

	return (
		<>
			<div
				className={`w-full p-1 flex flex-row h-20 bg-gray-200 border-t border-[#A9D0F5]`}
			>
				<img
					src={LOGO_EST}
					alt="image"
					className="w-auto h-auto scale-95"
				/>
				<button
					className={`m-3 w-32 h-12 rounded-md text-gray-800 font-serif font-bold text-xl hover:bg-gray-300`}
					onClick={() => navigate("/")}
				>
					Home
				</button>
				<button
					className={`m-3 w-32 text-gray-800 rounded-lg font-serif font-bold  text-xl hover:bg-gray-300`}
					onClick={() => setUploading(true)}
				>
					upload
				</button>
				<div className={`${uploading ? "" : "hidden"}`}>
					<input
						placeholder="upload"
						type="file"
						className={`m-5 `}
						onChange={(event) => {
							const selectedFile = event.target.files[0];
							setFile(selectedFile);
						}}
					/>
				</div>
				<div className="flex bg-white m-2 mt-3 h-9 place-self-center ml-auto rounded-md">
					<input
						type="text"
						placeholder="Rechercher par CNE..."
						value={searchTerm}
						onChange={handleSearch}
						className="px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:border-blue-500 w-64"
					/>
					<svg
						className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
						width="20"
						height="20"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<button
						className={`h-9 w-10 flex justify-center items-center`}
						onClick={Filter}
					>
						<img
							src={filterIcon}
							alt="filter Icon"
							className="w-5 h-5"
						/>
					</button>
				</div>
			</div>
		</>
	);
}
export default GradesHeader;

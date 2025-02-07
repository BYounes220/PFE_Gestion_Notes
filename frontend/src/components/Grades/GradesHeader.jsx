import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LOGO_EST from "../../assets/LOGO_EST.png";
import ExcelJS from "exceljs";

function GradesHeader({
	setSearchedEvaluations,
	evaluations,
	elementName,
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
				</div>
			</div>
		</>
	);
}
export default GradesHeader;

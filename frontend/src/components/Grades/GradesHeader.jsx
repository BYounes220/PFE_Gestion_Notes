import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LOGO_EST from "../../assets/LOGO_EST.png";
import ExcelJS from "exceljs";

function GradesHeader({ setSearchedEvaluations, evaluations, elementName, showUploadButton }) {
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

	/*
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
	};*/

	return (
		<div className="w-full h-24 bg-white/80 backdrop-blur-lg shadow-sm  bg-gradient-to-r from-sky-400 to-orange-400  animate-gradient relative overflow-hidden">
			<div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
				{/* Logo Section */}
				<div className="flex items-center space-x-2 cursor-pointer transform transition duration-300 ">
					<img 
						src={LOGO_EST} 
						alt="logo" 
						className="h-16 w-auto filter drop-shadow-md"
					/>
				</div>

				{/* Navigation Buttons */}
				<div className="flex items-center space-x-4">
					<button className="px-6 py-2.5 rounded-full bg-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center space-x-2 group" onClick={() => navigate("/")}>
					<i class="fa-solid fa-house"></i>
						<span>Home</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default GradesHeader;

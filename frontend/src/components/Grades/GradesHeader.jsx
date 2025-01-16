import { useState, useEffect } from "react";
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
	const [query, setQuery] = useState("");
	const [uploading, setUploading] = useState(false);
	const [file, setFile] = useState("");
	const navigate = useNavigate();

//	const search = async (event) => {

	/* const search = async (event) => {
		event.preventDefault();
		evaluations.forEach((element) => {
			if (element.etudiant === query) {
				setSearchedEvaluations([element]);
			}
		});
	}; */
	const search = async (event) => {
		event.preventDefault();
		if (!query) {
		  setSearchedEvaluations(evaluations);
		} else {
		  const filteredEvaluations = evaluations.filter((element) =>
			element.etudiant.cne === query 
		  );
		  setSearchedEvaluations(filteredEvaluations); 
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
				<form
					className="flex bg-white m-2 mt-3 h-9 place-self-center ml-auto rounded-md"
					onSubmit={search}
				>
					<button
						className={`h-9 w-10 flex justify-center items-center`}
						type="submit"
					>
						<img
							src={searchIcon}
							alt="Search Icon"
							className="w-5 h-5"
						/>
					</button>
					<input
						placeholder="cne"
						className={`h-9  w-64 rounded-md pl-1 focus:outline-none focus:shadow-green-500 focus:shadow-sm`}
						name="queryValue"
						value={query}
						onChange={(newQuery) => setQuery(newQuery.target.value)}
					/>
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
				</form>
			</div>
		</>
	);
}
export default GradesHeader;

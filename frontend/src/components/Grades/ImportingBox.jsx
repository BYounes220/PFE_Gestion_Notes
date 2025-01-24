import uploadIcon from "../../assets/upload.svg";
import { useRef } from "react";
import ExcelJS from "exceljs";

function ImportingBox() {
	const FileInputRef = useRef(null);

	const handleBtnClick = () => {
		FileInputRef.current.click();
	};

	const handleChange = (e) => {
		const file = e.target.files[0];
		if (file) console.log(file);
	};

	const upload = (file) => {
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
		<div className="bg-yellow-200 w-11/12 h-52 rounded-md shadow-yellow-200 shadow-lg m-auto flex flex-col justify-center items-center hover:scale-105 duration-500">
			<input
				type="file"
				className="hidden"
				ref={FileInputRef}
				onChange={handleChange}
			/>
			<button onClick={handleBtnClick} type="file">
				<img src={uploadIcon} alt="upload icon" className="w-16 h-16" />
			</button>
			<h3 className="text-gray-700">
				Cliquez pour sélectionner un fichier
			</h3>
		</div>
	);
}
export default ImportingBox;

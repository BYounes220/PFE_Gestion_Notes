import uploadIcon from "../../assets/upload.svg";
import { useRef } from "react";
import ExcelJS from "exceljs";
import api from "../../api";
function ImportingBox({ element, evaluations }) {
	const FileInputRef = useRef(null);

	const handleBtnClick = () => {
		FileInputRef.current.click();
	};

	const handleChange = (e) => {
		const file = e.target.files[0];
		//if (file) console.log(file);
		upload(file);
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
				annee_academique: worksheet.getRow(3).getCell(2).value,
				element: element,
			};

			const notCreation = evaluations.find((e) => e.element === element);
			const update = evaluations.length > 0 && notCreation ? true : false;

			worksheet.eachRow((row, rowNumber) => {
				if (rowNumber > 4)
					if (row.getCell(1).value) {
						importedEvaluations.push({
							note_ordinaire: row.getCell(4).value,
							note_rattrapage: row.getCell(5).value,
							etudiant: row.getCell(1).value,
							element: meta.element,
							annee_academique: meta.annee_academique,
						});
						if (update) {
							const last = importedEvaluations.at(
								importedEvaluations.length - 1
							);

							const matchingEvaluation = evaluations.find(
								(e) =>
									e.etudiant === last.etudiant &&
									e.annee_academique ===
										last.annee_academique &&
									e.element === last.element
							);

							if (matchingEvaluation) {
								importedEvaluations.at(
									importedEvaluations.length - 1
								).id = matchingEvaluation.id;
							}
						}
					}
			});

			//console.log(importedEvaluations);

			try {
				if (update) {
					const res = await api.patch(
						"/Grades/updateEvaluations/",
						importedEvaluations
					);
					console.log("uploading with success");
					console.log(res.data);
				} else {
					const res = await api.post(
						"/Grades/createEvaluations/",
						importedEvaluations
					);
					console.log("uploading with success");
					console.log(res.data);
				}
			} catch (error) {
				console.log("uploading evaluation errors");
			}
		};
		reader.readAsArrayBuffer(file);
	};

	return (
		<div className="bg-yellow-200 w-11/12 h-52 rounded-md shadow-yellow-200 shadow-lg m-auto mt-2 mb-6 flex flex-col justify-center items-center hover:scale-105 duration-500 animate-fadeIn">
  <input
    type="file"
    className="hidden"
    ref={FileInputRef}
    onChange={handleChange}
  />
  <button onClick={handleBtnClick} type="button">
    <img
      src={uploadIcon}
      alt="upload icon"
      className="w-16 h-16 animate-bounce"
    />
  </button>
  <h3 className="text-gray-700">
    Cliquez pour sélectionner un fichier
  </h3>
</div>

	);
}
export default ImportingBox;

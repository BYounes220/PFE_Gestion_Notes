import React, { useEffect, useState } from "react";
import api from "../../api";

function Evaluations({ evaluations, setEvaluations, setSearchedEvaluations }) {
	const [error, setError] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	useEffect(() => {
		api.get("/Grades/evaluations/")
			.then((response) => {
				const evaluationsData = Array.isArray(response.data)
					? response.data
					: [response.data];
				setEvaluations(evaluationsData);
			})
			.catch(() => {
				setError("Failed to fetch evaluations.");
			});
	}, [setEvaluations]);

	const getMontion = (noteOrdinaire, noteRattrapage) => {
		return noteOrdinaire >= 12 || noteRattrapage >= 12 ? "VAL" : "NVAL";
	};

	const handlePrint = () => {
		const printContent = `
      <div class="flex flex-col items-center justify-center p-6">
        <h1 class="text-2xl font-bold text-blue-700">Liste des Evaluations</h1>
        <p class="text-lg"><strong>Element:</strong> ${evaluations[0].element}</p>
        <p class="text-lg"><strong>Année Académique:</strong> ${evaluations[0].annee_academique}</p>
      </div>
    `;

		const printWindow = window.open("", "_blank");
		printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="fr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Liste des Evaluations</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>
          /* Ensure colors are applied in print */
          @media print {
            * {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            thead {
              background-color: #1e40af !important;
              color: white !important;
            }
            th {
              background-color: #1e40af !important;
              color: white !important;
            }
          }
        </style>
      </head>
      <body class="bg-gray-100 p-8">
        ${printContent}
        <div class="overflow-x-auto">
          <table class="w-11/12 mx-auto border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr class="bg-blue-700 text-white">
                <th class="p-3 text-left">#</th>
                <th class="p-3 text-left">CNE</th>
                <th class="p-3 text-left">Nom Complet</th>
                <th class="p-3 text-left">Note Ordinaire</th>
                <th class="p-3 text-left">Note Rattrapage</th>
                <th class="p-3 text-left">Validation</th>
              </tr>
            </thead>
            <tbody>
              ${evaluations
					.map(
						(evaluation, index) => `
                <tr class="${
					index % 2 === 0 ? "bg-gray-100" : "bg-white"
				} border-b">
                  <td class="p-3">${index + 1}</td>
                  <td class="p-3">${evaluation.cne_etudiant}</td>
                  <td class="p-3">${evaluation.full_name_etudiant}</td>
                  <td class="p-3">${evaluation.note_ordinaire}</td>
                  <td class="p-3">${evaluation.note_rattrapage}</td>
                  <td class="p-3 font-semibold ${
						evaluation.note_ordinaire >= 12 ||
						evaluation.note_rattrapage >= 12
							? "text-green-600"
							: "text-red-600"
					}">
                    ${getMontion(
						evaluation.note_ordinaire,
						evaluation.note_rattrapage
					)}
                  </td>
                </tr>
              `
					)
					.join("")}
            </tbody>
          </table>
        </div>
      </body>
      </html>
    `);

		printWindow.document.close();
		printWindow.print();
	};

	const handleSearch = (e) => {
		const term = e.target.value;
		setSearchTerm(term);

		if (term.trim() === "") {
			setSearchedEvaluations([]);
		} else {
			const filtered = evaluations.filter((evaluation) =>
				evaluation.cne_etudiant
					.toLowerCase()
					.includes(term.toLowerCase())
			);
			setSearchedEvaluations(filtered);
		}
	};

	if (error) {
		return (
			<div className="p-4 text-center text-red-600">
				<p>{error}</p>
			</div>
		);
	}

	return (
		<div className="container mx-auto ">
			<div className="flex justify-between items-center mb-4 p-2">
				<div className="flex bg-white m-2 mt-3 h-9 place-self-center  rounded-md">
					<input
						type="text"
						placeholder="Rechercher par CNE..."
						value={searchTerm}
						onChange={handleSearch}
						className="px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:border-blue-500 w-64"
					/>
				</div>
				<button
					className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-bg duration-1000"
					onClick={handlePrint}
				>
					Imprimer
				</button>
			</div>
			<div className="overflow-x-auto shadow-lg rounded-lg w-full">
				<table className="min-w-full border-collapse border border-gray-300 bg-white">
					<thead className="bg-blue-600 text-white">
						<tr>
							<th className="border border-gray-300 px-4 py-2 text-left">
								#
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								CNE
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Nom Complet
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Note Ordinaire
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Note Rattrapage
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Année
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Validation
							</th>
						</tr>
					</thead>
					<tbody>
						{evaluations && evaluations.length > 0 ? (
							evaluations.map((evaluation, index) => (
								<tr
									key={evaluation.id}
									className={
										index % 2 === 0
											? "bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
											: "bg-white hover:bg-blue-50 transition-colors duration-200"
									}
								>
									<td className="border border-gray-300 px-4 py-2">
										{index + 1}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{evaluation.cne_etudiant}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{evaluation.full_name_etudiant}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{evaluation.note_ordinaire}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{evaluation.note_rattrapage}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{evaluation.annee_academique}
									</td>
									<td className="border border-gray-300 px-4 py-2">
										{getMontion(
											evaluation.note_ordinaire,
											evaluation.note_rattrapage
										)}
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan="7" className="text-center py-4">
									No evaluations found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Evaluations;

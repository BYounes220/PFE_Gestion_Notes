import React, { useEffect, useState } from "react";
import api from "../../api";
import '@fortawesome/fontawesome-free/css/all.min.css';

function Evaluations({ evaluations, setEvaluations, setSearchedEvaluations }) {
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);

  // Fetch the list of academic years once on mount.
  useEffect(() => {
    api.get("/Grades/annee_academique/")
      .then((response) => {
        setAvailableYears(response.data);
      })
      .catch((err) => {
        console.error("Error fetching academic years:", err);
      });
  }, []);

  useEffect(() => {
    if (academicYear) {
      api.get("/Grades/evaluations/", { params: { annee_academique: academicYear } })
        .then((response) => {
          const evaluationsData = Array.isArray(response.data)
            ? response.data
            : [response.data];
          setEvaluations(evaluationsData);
          setSearchedEvaluations([]); 
        })
        .catch(() => {
          setError("Failed to fetch evaluations.");
        });
    } else {
      setEvaluations([]);
      setSearchedEvaluations([]);
    }
  }, [academicYear, setEvaluations, setSearchedEvaluations]);

  const getMontion = (noteOrdinaire, noteRattrapage) => {
    return noteOrdinaire >= 12 || noteRattrapage >= 12 ? "VAL" : "NVAL";
  };

  const handlePrint = () => {
    if (evaluations.length === 0) return;

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
              background-color: rgb(250, 204, 21) !important;
              color: white !important;
            }
            th {
              background-color: rgb(250, 204, 21) !important;
              color: black !important;
            }
          }
        </style>
      </head>
      <body class="bg-gray-100 p-8">
        ${printContent}
        <div class="overflow-x-auto">
          <table class="w-11/12 mx-auto border-collapse bg-white shadow-md rounded-lg">
            <thead>
              <tr class="bg-yellow-400 text-black">
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
                <tr class="${index % 2 === 0 ? "bg-gray-100" : "bg-white"} border-b">
                  <td class="p-3">${index + 1}</td>
                  <td class="p-3">${evaluation.cne_etudiant}</td>
                  <td class="p-3">${evaluation.full_name_etudiant}</td>
                  <td class="p-3">${evaluation.note_ordinaire}</td>
                  <td class="p-3">${evaluation.note_rattrapage}</td>
                  <td class="p-3 font-semibold ${
                    evaluation.note_ordinaire >= 12 || evaluation.note_rattrapage >= 12
                      ? "text-green-600"
                      : "text-red-600"
                  }">
                    ${getMontion(evaluation.note_ordinaire, evaluation.note_rattrapage)}
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
        evaluation.cne_etudiant.toLowerCase().includes(term.toLowerCase())
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
    
    
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        {/* Academic Year Selection */}
        <div className="w-full sm:w-64 relative group">
          <label className="block text-sm font-medium text-blue-600 mb-1 ml-1">
            <i className="fas fa-calendar-alt mr-2"></i>
            Année académique
          </label>
          <select
            id="academicYear"
            value={academicYear}
            onChange={(e) => setAcademicYear(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-blue-200 bg-white 
                      focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                      transition-all duration-300 hover:border-blue-300
                      appearance-none pr-10"
          >
            <option value="">Sélectionner une année</option>
            {availableYears.map((year, index) => (
              <option key={index} value={year} className="py-2">
                {year}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-9 transform -translate-y-1/2 text-blue-400">
            <i className="fas fa-chevron-down"></i>
          </div>
        </div>

        {/* Search Input */}
        <div className="w-full sm:w-96 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <i className="fas fa-search"></i>
          </div>
          <input
            type="text"
            placeholder="Rechercher par CNE..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-blue-200 
                      focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                      transition-all duration-300 hover:border-blue-300"
          />
        </div>

        {/* Print Button */}
        <button
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-600 text-white 
                    font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 
                    transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl
                    flex items-center justify-center"
          onClick={handlePrint}
        >
          <i className="fas fa-print mr-3 text-lg"></i>
          Imprimer
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-50">
        <table className="min-w-full divide-y divide-blue-100">
          <thead className="bg-gradient-to-r from-blue-500 to-blue-600">
            <tr>
              {['#', 'CNE', 'Nom Complet', 'Note Ordinaire', 'Note Rattrapage', 'Année', 'Validation'].map((header, idx) => (
                <th key={idx} className="px-6 py-4 text-left text-white font-bold uppercase text-sm">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-blue-100">
            {evaluations && evaluations.length > 0 ? (
              evaluations.map((evaluation, index) => (
                <tr
                  key={evaluation.id}
                  className="hover:bg-blue-50 transition-colors duration-200 group"
                >
                  <td className="px-6 py-4 text-gray-700 font-medium">{index + 1}</td>
                  <td className="px-6 py-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {evaluation.cne_etudiant}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-800">
                    <i className="fas fa-user-graduate mr-3 text-blue-400"></i>
                    {evaluation.full_name_etudiant}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-file-signature text-blue-600 text-sm"></i>
                      </span>
                      {evaluation.note_ordinaire}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                        <i className="fas fa-redo-alt text-orange-600 text-sm"></i>
                      </span>
                      {evaluation.note_rattrapage}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-blue-600 font-medium">
                    {evaluation.annee_academique}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                      getMontion(evaluation.note_ordinaire, evaluation.note_rattrapage) === 'VAL' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {getMontion(evaluation.note_ordinaire, evaluation.note_rattrapage)}
                      <i className={`fas ${
                        getMontion(evaluation.note_ordinaire, evaluation.note_rattrapage) === 'VAL' 
                          ? 'fa-check-circle ml-2'
                          : 'fa-times-circle ml-2'
                      }`}></i>
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <i className="fas fa-inbox text-4xl mb-4 text-blue-300"></i>
                    <p className="text-lg">Veuillez sélectionner une année académique</p>
                  </div>
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

import React, { useEffect, useState } from "react";
import api from "../../api";

function Evaluations({ evaluations, setEvaluations, searchedEvaluations }) {
  const [error, setError] = useState(null);

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
    // Get the printable table content
    const printableTable = document.getElementById("printable-table").innerHTML;

    // Create a new window
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            /* Add print-specific styles */
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #000; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          ${printableTable}
        </body>
      </html>
    `);
    printWindow.document.close();

    // Trigger the print dialog
    printWindow.print();
  };

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Evaluations
      </h1>
      {/* Print Button */}
      <div className="text-right mb-4">
        <button
          onClick={handlePrint}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Print Table
        </button>
      </div>
      {/* Printable Table Container */}
      <div id="printable-table">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">#</th>
              <th className="border border-gray-300 px-4 py-2 text-left">CNE</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Nom Complet</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Note Ordinaire</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Note Rattrapage</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Année</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Validation</th>
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
                  <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
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
                    {getMontion(evaluation.note_ordinaire, evaluation.note_rattrapage)}
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
import React, { useEffect, useState } from "react";
import api from "../../api";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { jsPDF } from "jspdf";
import "jspdf-autotable";

function Evaluations({ evaluations, setEvaluations, setSearchedEvaluations }) {
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [availableYears, setAvailableYears] = useState([]);
  const [validationFilter, setValidationFilter] = useState("");
  const [moyenneOrd, setMoyenneOrd] = useState(0);
  const [moyenneRatt, setMoyenneRatt] = useState(0);
  const [nombreValider , setNombreValider] = useState(0);
  const [nombreNonValider , setNombreNonValider] = useState(0);

  // State to keep track of rows in edit mode and their current grade values.
  const [editingGrades, setEditingGrades] = useState({});

  // Fetch the list of academic years 
  useEffect(() => {
    api.get("/Grades/annee_academique/")
      .then((response) => {
        setAvailableYears(response.data);
      })
      .catch((err) => {
        console.error("Error fetching academic years:", err);
      });
  }, []);

  // Fetch evaluations when academicYear changes.
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

  const getMontion = (note_ordinaire, note_rattrapage) => {
    return Number(note_ordinaire) >= 12 || Number(note_rattrapage) >= 12 ? "VAL" : "NVAL";
  };

  const getMoyenneOrdinaire = (evaluations) => {
    if (!evaluations || evaluations.length === 0) {
      return 0;
    }
    const sum = evaluations.reduce((acc, ev) => acc + Number(ev.note_ordinaire), 0);
    return sum / evaluations.length;
  };
  const getMoyenneRattrappage = (evaluations) => {
    if (!evaluations || evaluations.length === 0) {
      return 0;
    }
    const sum = evaluations.reduce((acc, ev) => acc + Number(ev.note_rattrapage), 0);
    return sum / evaluations.length;
  };

  const nbrValider = (evaluations) => {
    if(!evaluations || evaluations.length === 0 ) {
      return 0;
    }
    return evaluations.filter((evaluation) => getMontion(evaluation.note_ordinaire, evaluation.note_rattrapage) === "VAL").length;
  }

  // Recalculate average when evaluations change.
  useEffect(() => {
    setMoyenneOrd(getMoyenneOrdinaire(evaluations));
    setMoyenneRatt(getMoyenneRattrappage(evaluations));
    setNombreNonValider(evaluations.length - nbrValider(evaluations));
    setNombreValider(nbrValider(evaluations));
  }, [evaluations]);

  // Toggle the row into edit mode.
  const handleEditClick = (evaluation) => {
    setEditingGrades(prev => ({
      ...prev,
      [evaluation.id]: {
        note_ordinaire: evaluation.note_ordinaire,
        note_rattrapage: evaluation.note_rattrapage,
      }
    }));
  };

  // Cancel edit mode for the given row.
  const handleCancelClick = (id) => {
    setEditingGrades(prev => {
      const newState = { ...prev };
      delete newState[id];
      return newState;
    });
  };

  // Handle input changes in edit mode.
  const handleInputChange = (id, field, value) => {
    setEditingGrades(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };

  // Save changes to the backend using PUT.
  const handleSaveClick = (evaluation) => {
    const updatedData = {
      note_ordinaire: Number(editingGrades[evaluation.id].note_ordinaire),
      note_rattrapage: Number(editingGrades[evaluation.id].note_rattrapage) < 12 ? Number(editingGrades[evaluation.id].note_rattrapage) : 12
    };

    console.log("evaluations have been saved!", evaluation.id, updatedData);

    api.put(`/Grades/evaluations/${evaluation.id}/`, updatedData)
      .then((response) => {
        console.log("Update successful:", response.data);
        setEvaluations(prev =>
          prev.map(ev => ev.id === evaluation.id ? response.data : ev)
        );
        handleCancelClick(evaluation.id);
      })
      .catch(err => {
        if (err.response) {
          console.error("Error updating evaluation:", err.response.data);
        } else {
          console.error("Error updating evaluation:", err);
        }
      });
  };

  // Search handler.
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

  const filteredEvaluations = evaluations.filter(evaluation => {
    if (!validationFilter) return true;
    return getMontion(evaluation.note_ordinaire, evaluation.note_rattrapage) === validationFilter;
  });

  if (error) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>{error}</p>
      </div>
    );
  }
  const handlePrint = () => {
    if (evaluations.length === 0) {
      alert("Aucune évaluation à imprimer!");
      return;
    }
  
    const doc = new jsPDF();
    const element = evaluations[0].element;
    const annee = evaluations[0].annee_academique;
    const date = new Date().toLocaleDateString('fr-FR');
  
    // Add header
    doc.setFontSize(18);
    doc.setTextColor(29, 78, 216); // Blue color
    doc.text(`Element - ${element}`, 80, 22);
    
    // Add subtitle
    doc.setFontSize(12);
    doc.setTextColor(100, 116, 139); // Gray color
    doc.text(`Année Académique: ${annee} | Généré le: ${date}`, 50, 30);
  
    // Prepare table data
    const headers = [
      "#", 
      "CNE", 
      "Nom Complet", 
      "Note Ordinaire", 
      "Note Rattrapage", 
      "Validation"
    ];
  
    const body = evaluations.map((evaluation, index) => [
      index + 1,
      evaluation.cne_etudiant,
      evaluation.full_name_etudiant,
      evaluation.note_ordinaire,
      evaluation.note_rattrapage || '-',
      getMontion(evaluation.note_ordinaire, evaluation.note_rattrapage)
    ]);
  
    // Create the PDF table
    doc.autoTable({
      startY: 40,
      head: [headers],
      body: body,
      theme: 'grid',
      styles: {
        fontSize: 10,
        cellPadding: 1.5,
        valign: 'middle'
      },
      headStyles: {
        fillColor: [250, 205, 21], // Yellow background
        textColor: 0, // Black text
        fontSize: 11,
        fontStyle: 'bold'
      },
      alternateRowStyles: {
        fillColor: [243, 244, 246] // Gray alternate rows
      },
      columnStyles: {
        0: { cellWidth: 10 },
        5: { cellWidth: 25 }
      },
      didDrawCell: (data) => {
        // Color validation status
        if (data.column.index === 5) {
          const status = data.cell.raw;
          if (status === 'VAL') {
              doc.setTextColor(34, 197, 94);  
          } else {
              doc.setTextColor(239, 68, 68);
          }
      }
      
      }
    });
  
    // Save the PDF
    doc.save(`Notes${element}_${annee}.pdf`);
  };

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
                      transition-all duration-300 hover:border-blue-300 appearance-none pr-10"
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
        <div className="w-full sm:w-96 relative mt-[27px]">
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
          className="w-full sm:w-auto px-6 py-3 mt-[27px] bg-gradient-to-r from-orange-700 to-orange-700 text-white 
                    font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 
                    transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center"
          onClick={() => {
            handlePrint();
          }}
        >
          <i className="fas fa-print mr-3 text-lg"></i>
          Imprimer
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-blue-50">
        <table className="min-w-full divide-y divide-blue-100">
            <thead className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg">
              <tr className="group">
                  <th className="px-8 py-5 text-left text-white font-semibold uppercase text-sm tracking-wider border-b-2 border-white/20 relative">
                      <span className="transform transition-transform duration-200 group-hover:translate-x-1">#</span>
                  </th>
                  <th className="px-8 py-5 text-left text-white font-semibold uppercase text-sm tracking-wider border-b-2 border-white/20">
                      <div className="flex items-center space-x-2">
                          <i className="fas fa-id-card text-sm opacity-80"></i>
                          <span>CNE</span>
                      </div>
                  </th>
                  <th className="px-8 py-5 text-left text-white font-semibold uppercase text-sm tracking-wider border-b-2 border-white/20">
                      <div className="flex items-center space-x-2">
                          <i className="fas fa-user-tag text-sm opacity-80"></i>
                          <span>Nom Complet</span>
                      </div>
                  </th>
                  <th className="px-8 py-5 text-left text-white font-semibold uppercase text-sm tracking-wider border-b-2 border-white/20">
                      <div className="flex items-center space-x-2">
                          <i className="fas fa-chart-line text-sm opacity-80"></i>
                          <span>Note Ordinaire</span>
                      </div>
                  </th>
                  <th className="px-8 py-5 text-left text-white font-semibold uppercase text-sm tracking-wider border-b-2 border-white/20">
                      <div className="flex items-center space-x-2">
                          <i className="fas fa-redo-alt text-sm opacity-80"></i>
                          <span>Note Rattrapage</span>
                      </div>
                  </th>
                  <th className="px-8 py-5 text-left text-white font-semibold uppercase text-sm tracking-wider border-b-2 border-white/20">
                      <div className="flex flex-col space-y-2">
                          <select
                              value={validationFilter}
                              onChange={(e) => setValidationFilter(e.target.value)}
                              className="mt-1 w-full px-3 py-1.5 rounded-lg border-2 border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/20 focus:ring-2 focus:ring-white/50 focus:outline-none"
                          >
                              <label><i class="fa-solid fa-filter"></i></label>
                              <option value="" className="bg-blue-700/80">Validations</option>
                              <option value="VAL" className="text-emerald-600/80">Validé</option>
                              <option value="NVAL" className="text-rose-600/80">Non validé</option>
                          </select>
                      </div>
                  </th>
                  <th className="px-8 py-5 text-left text-white font-semibold uppercase text-sm tracking-wider border-b-2 border-white/20">
                      <div className="flex items-center space-x-2">
                          <i className="fas fa-cogs text-sm opacity-80"></i>
                          <span>Actions</span>
                      </div>
                  </th>
              </tr>
            </thead>

          <tbody className="bg-white divide-y divide-blue-100">
            {filteredEvaluations && filteredEvaluations.length > 0 ? (
              filteredEvaluations.map((evaluation, index) => {
                const isEditing = editingGrades.hasOwnProperty(evaluation.id);
                return (
                  <tr key={evaluation.id} className="hover:bg-blue-50 transition-colors duration-200 group">
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
                      {isEditing ? (
                        <input
                          type="number"
                          value={editingGrades[evaluation.id].note_ordinaire}
                          onChange={(e) => handleInputChange(evaluation.id, 'note_ordinaire', e.target.value)}
                          className="border rounded p-1"
                        />
                      ) : (
                        <div className="flex items-center">
                          <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-file-signature text-blue-600 text-sm"></i>
                          </span>
                          {evaluation.note_ordinaire}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <input
                          type="number"
                          value={editingGrades[evaluation.id].note_rattrapage}
                          onChange={(e) => handleInputChange(evaluation.id, 'note_rattrapage', e.target.value)}
                          className="border rounded p-1"
                        />
                      ) : (
                        <div className="flex items-center">
                          <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                            <i className="fas fa-redo-alt text-orange-600 text-sm"></i>
                          </span>
                          {evaluation.note_rattrapage}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                        getMontion(
                          isEditing ? editingGrades[evaluation.id].note_ordinaire : evaluation.note_ordinaire, 
                          isEditing ? editingGrades[evaluation.id].note_rattrapage : evaluation.note_rattrapage
                        ) === 'VAL'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {getMontion(
                          isEditing ? editingGrades[evaluation.id].note_ordinaire : evaluation.note_ordinaire, 
                          isEditing ? editingGrades[evaluation.id].note_rattrapage : evaluation.note_rattrapage
                        )}
                        <i className={`fas ${
                          getMontion(
                            isEditing ? editingGrades[evaluation.id].note_ordinaire : evaluation.note_ordinaire, 
                            isEditing ? editingGrades[evaluation.id].note_rattrapage : evaluation.note_rattrapage
                          ) === 'VAL'
                            ? 'fa-check-circle ml-2'
                            : 'fa-times-circle ml-2'
                        }`}></i>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {isEditing ? (
                        <div className="flex space-x-2">
                          <button onClick={() => handleSaveClick(evaluation)} className="text-green-600 hover:text-green-800">
                            <i className="fas fa-save"></i>
                          </button>
                          <button onClick={() => handleCancelClick(evaluation.id)} className="text-red-600 hover:text-red-800">
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => handleEditClick(evaluation)} className="text-blue-600 hover:text-blue-800">
                          <i className="fas fa-edit"></i>
                          <p className="ml-2">Edit</p>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-8 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <i className="fas fa-inbox text-4xl mb-4 text-blue-300"></i>
                    <p className="text-lg">Aucune évaluation trouvée.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="statistics flex flex-col items-center py-6 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-xl mt-5 text-white transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl shadow-lg border border-white/10 relative overflow-hidden">
    <h3 className="text-2xl font-bold mb-4 font-mono tracking-wide border-b-2 border-white/20 pb-2 px-8">
        📊 Statistiques
    </h3>
    
    <div className="flex flex-wrap items-center justify-center gap-8 divide-x divide-white/20">
        {/* Existing Gauges */}
        <div className="flex items-center px-8 group">
            <div className="relative p-3 bg-white/10 rounded-full mr-4 transform group-hover:rotate-12 transition-all">
                <i className="fa-solid fa-gauge text-xl animate-pulse"></i>
                <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-spin-slow"></div>
            </div>
            <div>
                <p className="text-sm font-light opacity-80">Moyenne Ordinaire</p>
                <p className="text-2xl font-bold text-emerald-200">
                    {moyenneOrd.toFixed(2)}
                    <span className="text-sm ml-1 text-white/70">avg</span>
                </p>
            </div>
        </div>

        <div className="flex items-center px-8 group">
            <div className="relative p-3 bg-white/10 rounded-full mr-4 transform group-hover:-rotate-12 transition-all">
                <i className="fa-solid fa-gauge-high text-xl animate-pulse delay-100"></i>
                <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-spin-slow reverse"></div>
            </div>
            <div>
                <p className="text-sm font-light opacity-80">Moyenne Rattrapage</p>
                <p className="text-2xl font-bold text-amber-200">
                    {moyenneRatt.toFixed(2)}
                    <span className="text-sm ml-1 text-white/70">avg</span>
                </p>
            </div>
        </div>

        {/* Enhanced Validation Stats */}
        <div className="flex items-center px-8 group">
            <div className="relative p-3 bg-white/10 rounded-full mr-4 transform group-hover:scale-110 transition-all">
                <i className="fa-solid fa-scale-balanced text-xl animate-pulse delay-200"></i>
                <div className="absolute inset-0 border-2 border-white/20 rounded-full animate-spin-slow"></div>
            </div>
            <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-4">
                    <div className="valider relative">
                        <p className="text-sm font-light opacity-80 flex items-center">
                            <i className="fa-solid fa-check-circle text-emerald-400 mr-1 text-xs"></i>
                            Validés
                        </p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            {nombreValider.toFixed(0)}
                        </p>
                    </div>
                    <div className="h-8 w-px bg-white/20"></div>
                    <div className="nonValider relative">
                        <p className="text-sm font-light opacity-80 flex items-center">
                            <i className="fa-solid fa-xmark-circle text-rose-400 mr-1 text-xs"></i>
                            Non Validés
                        </p>
                        <p className="text-2xl font-bold bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
                            {nombreNonValider.toFixed(0)}
                        </p>
                    </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                    <div 
                        className="bg-gradient-to-r from-emerald-400 to-cyan-400 h-full transition-all duration-500"
                        style={{ width: `${(nombreValider / (nombreValider + nombreNonValider)) * 100}%` }}
                    ></div>
                </div>
                <p className="text-xs text-white/60 text-center">
                    Taux de réussite: {((nombreValider / (nombreValider + nombreNonValider)) * 100).toFixed(1)}%
                </p>
            </div>
        </div>
    </div>

    {/* Animated background elements */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>
</div>
  </div>
  );
}

export default Evaluations;

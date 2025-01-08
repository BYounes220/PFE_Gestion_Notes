import React, { useEffect, useState } from "react";
import axios from "axios";


function Evaluations() {
    const [evaluations, setEvaluations] = useState([]);
    const [error, setError] = useState(null);
    const [editMode, setEditMode] = useState(null); 
    const [updatedNotes, setUpdatedNotes] = useState({}); 

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/Grades/evaluations/")
            .then((response) => {
                setEvaluations(response.data);
            })
            .catch(() => {
                setError("Failed to fetch evaluations.");
            });
    }, []);

    const handleEdit = (id) => {
        setUpdatedNotes({
            ...updatedNotes,
            [id]: {
                note_ordinaire: parseFloat(evaluations.find((evaluation) => evaluation.id === id).note_ordinaire),
                note_rattrapage: parseFloat(evaluations.find((evaluation) => evaluation.id === id).note_rattrapage),
            },
        });
        setEditMode(id);
    };

    const handleSave = (id) => {
        const updatedEvaluation = evaluations.find((evaluation) => evaluation.id === id);
        const updatedData = {
            ...updatedEvaluation,
            note_ordinaire: parseFloat(updatedNotes[id]?.note_ordinaire),
            note_rattrapage: parseFloat(updatedNotes[id]?.note_rattrapage),
        };
    
        if (
            isNaN(updatedData.note_ordinaire) ||
            updatedData.note_ordinaire < 0 ||
            updatedData.note_ordinaire > 20 ||
            isNaN(updatedData.note_rattrapage) ||
            updatedData.note_rattrapage < 0 ||
            updatedData.note_rattrapage > 20
        ) {
            setError("Invalid values. Notes must be numbers between 0 and 20.");
            return;
        }
    
        axios
            .put(`http://127.0.0.1:8000/Grades/evaluations/${id}/`, updatedData)
            .then((response) => {
                const updatedEvaluations = evaluations.map((evaluation) =>
                    evaluation.id === id ? response.data : evaluation
                );
                setEvaluations(updatedEvaluations);
                setEditMode(null); 
            })
            .catch((err) => {
                setError("Failed to save evaluation.");
                console.error("Error saving data:", err);
            });
    };

    const handleChange = (e, id, field) => {
        const value = e.target.value;
        setUpdatedNotes((prevState) => ({
            ...prevState,
            [id]: {
                ...prevState[id],
                [field]: value,
            },
        }));
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
            <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Evaluations</h1>
            <div className="overflow-x-auto shadow-lg rounded-lg">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Note Ordinaire</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Note Rattrapage</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Année</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Étudiant</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Élément</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {evaluations.map((evaluation, index) => (
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
                                    {editMode === evaluation.id ? (
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={
                                                updatedNotes[evaluation.id]?.note_ordinaire !== undefined
                                                    ? updatedNotes[evaluation.id].note_ordinaire
                                                    : evaluation.note_ordinaire
                                            }
                                            onChange={(e) => handleChange(e, evaluation.id, "note_ordinaire")}
                                            className="border p-1 rounded"
                                        />
                                    ) : (
                                        evaluation.note_ordinaire
                                    )}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {editMode === evaluation.id ? (
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={
                                                updatedNotes[evaluation.id]?.note_rattrapage !== undefined
                                                    ? updatedNotes[evaluation.id].note_rattrapage
                                                    : evaluation.note_rattrapage
                                            }
                                            onChange={(e) => handleChange(e, evaluation.id, "note_rattrapage")}
                                            className="border p-1 rounded"
                                        />
                                    ) : (
                                        evaluation.note_rattrapage
                                    )}
                                </td>

                                <td className="border border-gray-300 px-4 py-2">{evaluation.annee}</td>
                                <td className="border border-gray-300 px-4 py-2">{evaluation.full_name_etudiant}</td>
                                <td className="border border-gray-300 px-4 py-2">{evaluation.element_description}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    {editMode === evaluation.id ? (
                                        <button
                                            onClick={() => handleSave(evaluation.id)}
                                            className="bg-green-500 text-white px-4 py-2 rounded"
                                        >
                                            Save
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => handleEdit(evaluation.id)}
                                            className="bg-blue-500 text-white px-4 py-2 rounded"
                                        >
                                            Edit
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Evaluations;

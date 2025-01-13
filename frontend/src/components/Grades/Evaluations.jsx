import React, { useEffect, useState } from "react";
import api from "../../api";

function Evaluations({ evaluations, setEvaluations }) {
	//const [evaluations, setEvaluations] = useState([]);
	const [error, setError] = useState(null);
	const [editMode, setEditMode] = useState(false);
	const [updatedNotes, setUpdatedNotes] = useState({});
	const [montions, setMontions] = useState({});

	useEffect(() => {
		api.get("/Grades/evaluations/")
			.then((response) => {
				const evaluationsData = Array.isArray(response.data)
					? response.data
					: [response.data];
				setEvaluations(evaluationsData);
				console.log(evaluationsData);
			})
			.catch(() => {
				setError("Failed to fetch evaluations.");
			});
	}, []);

	const getMontion = (noteOrdinaire, noteRattrapage) => {
		return noteOrdinaire >= 12 || noteRattrapage >= 12 ? "VAL" : "NVAL";
	};

	const handleEdit = () => {
		const initialNotes = {};
		const initialMontions = {};

		evaluations.forEach((evaluation) => {
			initialNotes[evaluation.id] = {
				note_ordinaire: evaluation.note_ordinaire,
				note_rattrapage: evaluation.note_rattrapage,
			};
			initialMontions[evaluation.id] = getMontion(
				evaluation.note_ordinaire,
				evaluation.note_rattrapage
			);
		});

		setUpdatedNotes(initialNotes);
		setMontions(initialMontions);
		setEditMode(true);
	};

	const handleSave = () => {
		const updates = Object.entries(updatedNotes).map(([id, notes]) => {
			const evaluation = evaluations.find((ev) => ev.id === parseInt(id));
			return {
				...evaluation,
				note_ordinaire: parseFloat(notes.note_ordinaire),
				note_rattrapage: parseFloat(notes.note_rattrapage),
			};
		});

		const invalid = updates.some(
			(data) =>
				isNaN(data.note_ordinaire) ||
				data.note_ordinaire < 0 ||
				data.note_ordinaire > 20 ||
				data.note_rattrapage < 0 ||
				data.note_rattrapage > 20
		);

		if (invalid) {
			alert("Invalid values. Notes must be numbers between 0 and 20.");
			return;
		}

		Promise.all(
			updates.map((updatedData) =>
				api.put(`/Grades/evaluations/${updatedData.id}/`, updatedData)
			)
		)
			.then((responses) => {
				const updatedEvaluations = evaluations.map((evaluation) => {
					const updated = responses.find(
						(res) => res.data.id === evaluation.id
					);
					return updated ? updated.data : evaluation;
				});
				setEvaluations(updatedEvaluations);
				setEditMode(false);
				setUpdatedNotes({});
				setMontions({});
			})
			.catch((err) => {
				setError("Failed to save evaluations.");
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

		const updatedNoteOrdinaire =
			field === "note_ordinaire"
				? value
				: updatedNotes[id].note_ordinaire;
		const updatedNoteRattrapage =
			field === "note_rattrapage"
				? value
				: updatedNotes[id].note_rattrapage;

		setMontions((prevMontions) => ({
			...prevMontions,
			[id]: getMontion(updatedNoteOrdinaire, updatedNoteRattrapage),
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
			<h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
				Evaluations
			</h1>
			<div className="mb-4 text-right">
				{!editMode ? (
					<button
						onClick={handleEdit}
						className="bg-blue-500 text-white px-4 py-2 rounded"
					>
						Edit
					</button>
				) : (
					<button
						onClick={handleSave}
						className="bg-green-500 text-white px-4 py-2 rounded"
					>
						Save
					</button>
				)}
			</div>
			<div className="overflow-x-auto shadow-lg rounded-lg">
				<table className="min-w-full border-collapse border border-gray-300">
					<thead className="bg-blue-600 text-white">
						<tr>
							<th className="border border-gray-300 px-4 py-2 text-left">
								#
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
								Étudiant
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Élément
							</th>
							<th className="border border-gray-300 px-4 py-2 text-left">
								Validation
							</th>
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
								<td className="border border-gray-300 px-4 py-2">
									{index + 1}
								</td>
								<td className="border border-gray-300 px-4 py-2">
									{editMode ? (
										<input
											type="number"
											step="0.01"
											value={
												updatedNotes[evaluation.id]
													?.note_ordinaire ??
												evaluation.note_ordinaire
											}
											onChange={(e) =>
												handleChange(
													e,
													evaluation.id,
													"note_ordinaire"
												)
											}
											className="border p-1 rounded"
										/>
									) : (
										evaluation.note_ordinaire
									)}
								</td>
								<td className="border border-gray-300 px-4 py-2">
									{editMode ? (
										<input
											type="number"
											step="0.01"
											value={
												updatedNotes[evaluation.id]
													?.note_rattrapage ??
												evaluation.note_rattrapage
											}
											onChange={(e) =>
												handleChange(
													e,
													evaluation.id,
													"note_rattrapage"
												)
											}
											disabled={
												updatedNotes[evaluation.id]
													?.note_ordinaire >= 12
											}
											className="border p-1 rounded"
										/>
									) : (
										evaluation.note_rattrapage
									)}
								</td>
								<td className="border border-gray-300 px-4 py-2">
									{evaluation.annee_academique}
								</td>
								<td className="border border-gray-300 px-4 py-2">
									{evaluation.full_name_etudiant}
								</td>
								<td className="border border-gray-300 px-4 py-2">
									{evaluation.element_description}
								</td>
								<td className="border border-gray-300 px-4 py-2">
									{montions[evaluation.id] ??
										getMontion(
											evaluation.note_ordinaire,
											evaluation.note_rattrapage
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

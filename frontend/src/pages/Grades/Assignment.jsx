import GradesHeader from "../../components/Grades/GradesHeader";
import SelectionBox from "../../components/Grades/SelectionBox";
import TeacherIcon from "../../assets/teacher_whiteboard.png";
import BlueTeacherIcon from "../../assets/blue_teacher_whiteboard.png";
import BlueBook from "../../assets/blueBook.png";
import BookIcon from "../../assets/orangeBook.png";
import api from "../../api";
import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";

function Assignment() {
	const [allTeachers, setAllTeachers] = useState([]);
	const [elements, setElements] = useState([]);
	const [picked, setPicked] = useState(false);
	const [assignments, setAssignments] = useState([]);

	// Calculate available teachers based on assignments
	const availableTeachers = useMemo(() => {
		const assignedEmails = elements.flatMap(
			(el) =>
				el.assignedTeachers?.map((t) =>
					typeof t === "object" ? t.email_prof : t
				) || []
		);
		return allTeachers.filter(
			(t) => !assignedEmails.includes(t.email_prof)
		);
	}, [elements, allTeachers]);

	useEffect(() => {
		const fetchAssignments = async () => {
			try {
				const res = await api.get("/Grades/listAssignments/");
				const data = Array.isArray(res.data) ? res.data : [res.data];
				setAssignments(data);

				// Update elements with assigned teachers
				setElements((prevElements) =>
					prevElements.map((el) => {
						const elementAssignments = data.filter(
							(a) => a.element === el.nom_element
						);
						return {
							...el,
							assignedTeachers: elementAssignments.map(
								(a) => a.professeur
							),
						};
					})
				);
			} catch (error) {
				console.log(error);
			}
		};
		if (picked) fetchAssignments();
	}, [allTeachers, picked]);

	const handleDragStart = (e, teacherEmail, origin) => {
		e.dataTransfer.setData("teacherEmail", teacherEmail);
		e.dataTransfer.setData("origin", origin);
	};

	const handleDrop = async (e, elementName) => {
		e.preventDefault();
		const teacherEmail = e.dataTransfer.getData("teacherEmail");
		const origin = e.dataTransfer.getData("origin");

		try {
			if (origin === "teachers") {
				// Optimistically update UI for moving teacher to element
				setElements((prev) =>
					prev.map((el) =>
						el.nom_element === elementName
							? {
									...el,
									assignedTeachers: [
										...(el.assignedTeachers || []),
										teacherEmail,
									],
							  }
							: el
					)
				);

				await api.post("/Grades/assignTeacherElement/", {
					professeur: teacherEmail,
					element: elementName,
				});
			} else if (origin.startsWith("element:")) {
				const elementOrigin = origin.split(":")[1];

				// Optimistically update UI for moving teacher back to available list
				setElements((prev) =>
					prev.map((el) =>
						el.nom_element === elementOrigin
							? {
									...el,
									assignedTeachers:
										el.assignedTeachers.filter(
											(t) => t !== teacherEmail
										),
							  }
							: el
					)
				);

				const res = await api.post("/Grades/removeTeacherElement/", {
					professeur: teacherEmail,
					element: elementOrigin,
				});
				console.log(res);
			}
		} catch (error) {
			console.error("Operation failed:", error);
			// TODO: Add error state reversion here if needed
		}
	};

	const handleDragOver = (e) => {
		e.preventDefault();
	};

	const TeacherBox = ({ teacherEmail, teacherName, origin }) => (
		<motion.div
			className="flex items-center p-3 gap-3 border-l-4 border-l-orange-500 h-auto w-full bg-gradient-to-r from-white to-gray-50 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-move"
			draggable
			onDragStart={(e) => handleDragStart(e, teacherEmail, origin)}
			initial={{ opacity: 0, scale: 0.95 }}
			animate={{ opacity: 1, scale: 1 }}
			whileDrag={{ scale: 1.05, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
			whileTap={{ scale: 0.98 }}
		>
			<div className="flex-shrink-0">
				<img
					src={TeacherIcon}
					alt="enseignant"
					className="w-8 h-8 md:w-10 md:h-10"
				/>
			</div>
			<div className="flex-grow min-w-0">
				<h3 className="font-medium text-gray-800 text-sm md:text-base truncate">
					{teacherName}
				</h3>
				<p className="text-xs text-gray-500 truncate">{teacherEmail}</p>
			</div>
		</motion.div>
	);

	const ElementBox = ({ elementName, assignedTeachers = [] }) => (
		<motion.div
			className="flex flex-col p-4 gap-3 w-full bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
		>
			<div className="flex items-center gap-2 pb-2 border-b border-blue-100">
				<img
					src={BookIcon}
					alt="élément"
					className="w-6 h-6 md:w-7 md:h-7"
				/>
				<h2 className="font-semibold text-blue-900 text-base md:text-lg capitalize">
					{elementName}
				</h2>
			</div>
			<div
				className="bg-white/80 p-3 flex flex-col gap-2 rounded-lg border border-blue-100 transition-all duration-200"
				style={{
					minHeight: assignedTeachers.length ? "auto" : "150px",
				}}
				onDrop={(e) => handleDrop(e, elementName)}
				onDragOver={handleDragOver}
			>
				{assignedTeachers.map((teacherEmail) => {
					const teacher = allTeachers.find(
						(t) => t.email_prof === teacherEmail
					);
					return (
						<TeacherBox
							key={`${elementName}-${teacherEmail}`}
							teacherEmail={teacherEmail}
							teacherName={teacher?.nom_prof || "Inconnu"}
							origin={`element:${elementName}`}
						/>
					);
				})}
				{assignedTeachers.length === 0 && (
					<div className="flex items-center justify-center h-full text-gray-400 text-sm">
						Déposez les enseignants ici
					</div>
				)}
			</div>
		</motion.div>
	);

	return (
		<div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
			<GradesHeader />
			<div className="container mx-auto px-4 py-6 flex flex-col items-center">
				<div className="w-full max-w-3xl mb-8">
					<SelectionBox
						setPicked={setPicked}
						setAllTeachers={setAllTeachers}
						setElements={setElements}
					/>
				</div>

				{picked && (
					<motion.div
						className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mt-2"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.3 }}
					>
						<motion.div
							className="flex flex-col gap-4"
							initial={{ x: -20 }}
							animate={{ x: 0 }}
							transition={{ delay: 0.2 }}
						>
							<div className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-orange-400 p-4 rounded-xl text-white shadow-lg shadow-orange-100">
								<div className="p-2 bg-white/10 rounded-lg">
									<img
										src={BlueTeacherIcon}
										className="w-8 h-8 md:w-10 md:h-10"
										alt="Enseignants"
									/>
								</div>
								<h2 className="text-lg md:text-xl font-semibold">
									Enseignants Disponibles
								</h2>
							</div>
							<motion.div
								className="bg-white/80 backdrop-blur-sm p-5 rounded-xl shadow-lg shadow-gray-100/50 border border-orange-100"
								style={{
									height: "fit-content",
									maxHeight: "70vh",
									overflowY: "auto",
								}}
								onDrop={(e) => handleDrop(e, "teachers")}
								onDragOver={handleDragOver}
							>
								{availableTeachers.length > 0 ? (
									<div className="flex flex-col gap-3">
										{availableTeachers.map((teacher) => (
											<TeacherBox
												key={`available-${teacher.email_prof}`}
												teacherEmail={
													teacher.email_prof
												}
												teacherName={teacher.nom_prof}
												origin="teachers"
											/>
										))}
									</div>
								) : (
									<div className="flex flex-col items-center justify-center h-[200px] text-gray-400 space-y-3">
										<svg
											className="w-12 h-12 text-gray-300"
											fill="none"
											stroke="currentColor"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
											/>
										</svg>
										<span>Aucun enseignant disponible</span>
									</div>
								)}
							</motion.div>
						</motion.div>

						<motion.div
							className="flex flex-col gap-4"
							initial={{ x: 20 }}
							animate={{ x: 0 }}
							transition={{ delay: 0.2 }}
						>
							<div className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-500 p-4 rounded-xl text-white shadow-lg shadow-blue-100">
								<div className="p-2 bg-white/20 rounded-lg">
									<img
										src={BlueBook}
										className="w-8 h-8 md:w-10 md:h-10 filter brightness-0 invert"
										alt="Éléments"
									/>
								</div>
								<h2 className="text-lg md:text-xl font-semibold">
									Éléments du Cours
								</h2>
							</div>
							<div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-1">
								{elements.map((element, index) => (
									<motion.div
										key={`${element.nom_element}-${index}`}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: index * 0.1 }}
									>
										<ElementBox
											elementName={element.nom_element}
											assignedTeachers={
												element.assignedTeachers || []
											}
										/>
									</motion.div>
								))}
							</div>
						</motion.div>
					</motion.div>
				)}

				{!picked && (
					<motion.div
						className="flex flex-col items-center justify-center py-20 w-full max-w-2xl"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<div className="text-center space-y-4">
							<div className="w-20 h-20 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
								<svg
									className="w-10 h-10 text-gray-400"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M12 6v6m0 0v6m0-6h6m-6 0H6"
									/>
								</svg>
							</div>
							<div className="text-gray-600 text-lg font-medium">
								Veuillez sélectionner une option ci-dessus pour
								commencer
							</div>
						</div>
					</motion.div>
				)}
			</div>
		</div>
	);
}

export default Assignment;

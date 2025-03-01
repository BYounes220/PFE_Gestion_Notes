import GradesHeader from "../../components/Grades/GradesHeader";
import SelectionBox from "../../components/Grades/SelectionBox";
import TeacherIcon from "../../assets/teacher_whiteboard.png";
import BlueTeacherIcon from "../../assets/blue_teacher_whiteboard.png";
import BlueBook from "../../assets/blueBook.png";
import BookIcon from "../../assets/orangeBook.png";
import api from "../../api";
import React, { useState, useMemo, useEffect } from "react";

function Assignment() {
	// Initialize all teachers
	const [allTeachers, setAllTeachers] = useState([
		{ name: "P.Said", cin: "12345" },
		{ name: "P.lahmer", cin: "1789" },
		{ name: "Doe John", cin: "john.doe@example.com" },
	]);

	// Initialize elements
	const [elements, setElements] = useState([
		{ name: "java", assignedTeachers: [] },
		{ name: "uml", assignedTeachers: [] },
	]);

	useEffect(() => {
		const fetchAssignedTeachers = async () => {
			try {
				const res = await api.get("/Grades/listAssignments/");
				const data = Array.isArray(res.data) ? res.data : [res.data];

				// Update elements with assigned teachers
				const updatedElements = elements.map((element) => {
					const filteredAssignments = data.filter(
						(d) => d.element === element.name
					);

					const assignedTeachers = filteredAssignments.map(
						(assignment) => assignment.professeur
					);

					return {
						...element,
						assignedTeachers,
					};
				});

				setElements(updatedElements);
			} catch (error) {
				console.error("Error fetching assigned teachers:", error);
			}
		};

		fetchAssignedTeachers();
	}, []);

	const [picked, setPicked] = useState(true); // Set to true for testing

	// Calculate available teachers dynamically
	const availableTeachers = useMemo(() => {
		const assignedCins = elements.flatMap((el) => el.assignedTeachers);
		return allTeachers.filter((t) => !assignedCins.includes(t.cin));
	}, [elements, allTeachers]);

	// Handle drag start
	const handleDragStart = (e, teacherCin, origin) => {
		e.dataTransfer.setData("teacherCin", teacherCin);
		e.dataTransfer.setData("origin", origin);
	};

	// Handle drop
	const handleDrop = async (e, elementName) => {
		e.preventDefault();
		const teacherCin = e.dataTransfer.getData("teacherCin");
		const origin = e.dataTransfer.getData("origin");

		if (origin === "teachers") {
			// Add teacher to the element's assigned teachers
			setElements((prev) =>
				prev.map((el) =>
					el.name === elementName
						? {
								...el,
								assignedTeachers: [
									...el.assignedTeachers,
									teacherCin,
								],
						  }
						: el
				)
			);

			// Simulate API call to assign teacher
			try {
				console.log(
					"Assigning teacher:",
					teacherCin,
					"to element:",
					elementName
				);

				const res = await api.post("/Grades/assignTeacherElement/", {
					id_enseignement: "test",
					professeur: teacherCin,
					element: elementName,
				});
				console.log(res);
			} catch (error) {
				console.error("Assignment error:", error);
			}
		} else if (origin.startsWith("element:")) {
			const elementOrigin = origin.split(":")[1];

			// Remove teacher from the original element
			setElements((prev) =>
				prev.map((el) =>
					el.name === elementOrigin
						? {
								...el,
								assignedTeachers: el.assignedTeachers.filter(
									(t) => t !== teacherCin
								),
						  }
						: el
				)
			);

			// Simulate API call to remove teacher
			try {
				console.log(
					"Removing teacher:",
					teacherCin,
					"from element:",
					elementOrigin
				);
				// await api.post("/Grades/removeTeacherElement/", {
				//   professeur: teacherCin,
				//   element: elementOrigin,
				// });
			} catch (error) {
				console.error("Removal error:", error);
			}
		}
	};

	// Handle drag over
	const handleDragOver = (e) => {
		e.preventDefault();
	};

	// TeacherBox component
	const TeacherBox = ({ teacherCin, teacherName, origin }) => {
		return (
			<div
				className="flex p-2 gap-2 border-l-4 border-l-orange-500 h-16 w-11/12 bg-white rounded-xl shadow-lg cursor-move"
				draggable
				onDragStart={(e) => handleDragStart(e, teacherCin, origin)}
			>
				<img src={TeacherIcon} alt="teacher" className="w-12 h-12" />
				<h1 className="mt-2 font-semibold">{teacherName}</h1>
			</div>
		);
	};

	// ElementBox component
	const ElementBox = ({ elementName, assignedTeachers }) => {
		return (
			<div className="flex flex-col p-6 gap-2 min-h-44 w-11/12 bg-white rounded-xl shadow-lg">
				<div className="flex gap-1">
					<img
						src={BookIcon}
						alt="element"
						className="w-8 h-8 mt-1"
					/>
					<h1 className="mt-2 font-semibold">{elementName}</h1>
				</div>
				<div
					className="bg-orange-50 min-h-28 p-2 flex flex-col gap-2"
					onDrop={(e) => handleDrop(e, elementName)}
					onDragOver={handleDragOver}
				>
					{assignedTeachers.map((teacherCin) => {
						const teacher = allTeachers.find(
							(t) => t.cin === teacherCin
						);
						return (
							<TeacherBox
								key={teacherCin}
								teacherCin={teacherCin}
								teacherName={teacher?.name || "Unknown"}
								origin={`element:${elementName}`}
							/>
						);
					})}
				</div>
			</div>
		);
	};

	return (
		<div className="flex flex-col gap-4 items-center w-full min-h-screen">
			<GradesHeader />
			<SelectionBox setPicked={setPicked} />
			{picked && (
				<div className="flex gap-6 w-11/12 mt-2">
					{/* Available Teachers Section */}
					<div className="flex flex-col w-1/2 gap-3">
						<h1 className="flex font-semibold text-xl text-blue-700">
							<img src={BlueTeacherIcon} className="w-12 h-12" />
							Professeurs disponibles
						</h1>
						<div
							className="bg-orange-50 shadow-inner rounded-lg p-2 flex flex-col gap-2"
							onDrop={(e) => handleDrop(e, "teachers")}
							onDragOver={handleDragOver}
						>
							{availableTeachers.map((teacher) => (
								<TeacherBox
									key={teacher.cin}
									teacherCin={teacher.cin}
									teacherName={teacher.name}
									origin="teachers"
								/>
							))}
						</div>
					</div>

					{/* Elements Section */}
					<div className="flex flex-col w-1/2 gap-3">
						<h1 className="flex font-semibold text-xl text-blue-700">
							<img src={BlueBook} className="w-10 h-10" />
							Les éléments
						</h1>
						<div className="flex flex-col gap-2">
							{elements.map((element) => (
								<ElementBox
									key={element.name}
									elementName={element.name}
									assignedTeachers={element.assignedTeachers}
								/>
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default Assignment;

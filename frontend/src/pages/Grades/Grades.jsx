import { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/Grades/Navbar";
import GradesHeader from "../../components/Grades/GradesHeader";
import Evaluations from "../../components/Grades/Evaluations";
import api from "../../api";
import ImportingBox from "../../components/Grades/ImportingBox";

function Grades() {
	const [element, setElement] = useState("");
	const [searchedEvaluations, setSearchedEvaluations] = useState([]);
	const [evaluations, setEvaluations] = useState([]);
	//const [teacherName, setTeacherName] = useState("");

	useEffect(() => {
		const fetchEvaluations = async () => {
			try {
				const response = await api.get("/Grades/evaluations/");
				console.log("Fetched evaluations:", response.data);
				setEvaluations(response.data);
			} catch (error) {
				console.error("Failed to fetch evaluations:", error);
			}
		};

		fetchEvaluations();
	}, []);

	const filteredEvaluations = useMemo(() => {
		return element
			? evaluations.filter(
					(evaluation) => evaluation.nom_element === element
			  )
			: []; 
	}, [element, evaluations]);

	return (
		<div className={`w-screen flex flex-col h-screen bg-white`}>
			<GradesHeader
				setSearchedEvaluations={setSearchedEvaluations}
				evaluations={filteredEvaluations} // Pass only filtered evaluations
				elementName={element}
				//teacherName={teacherName}
			/>
			<Navbar setElement={setElement} />
			<div className="overflow-y-auto flex-grow bg-white shadow-lg rounded-lg">
				{element && (
					<Evaluations
						evaluations={searchedEvaluations.length > 0 ? searchedEvaluations : filteredEvaluations}
						setEvaluations={setEvaluations}
					/>
				)}
			</div>
			<ImportingBox />
		</div>
	);
}

export default Grades;

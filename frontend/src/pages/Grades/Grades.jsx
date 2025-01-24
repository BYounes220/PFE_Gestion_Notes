import { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/Grades/Navbar";
import GradesHeader from "../../components/Grades/GradesHeader";
import Evaluations from "../../components/Grades/Evaluations";
import api from "../../api";
import ImportingBox from "../../components/Grades/ImportingBox";

function Grades() {
	//this the name of the selected element in the navbar
	const [element, setElement] = useState("");
	const [searchedEvaluations, setSearchedEvaluations] = useState([]);
	const [evaluations, setEvaluations] = useState([]);
	const [filter, setFilter] = useState(false);
	const [allEvaluations, setAllEvaluations] = useState([]);

	useEffect(() => {
		const fetchEvaluations = async () => {
			try {
				const response = await api.get("/Grades/evaluations/");
				setEvaluations(response.data);
			} catch (error) {
				console.error("Failed to fetch evaluations:", error);
			}
		};
		fetchEvaluations();
	}, []);

	useEffect(() => {
		console.log(element);
	}, [element]);

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
				evaluations={filteredEvaluations}
				elementName={element}
			/>
			<Navbar setElement={setElement} />
			{/*
			<div className="overflow-y-auto flex-grow bg-white shadow-lg rounded-lg">
				{elementName && (
					<Evaluations
						evaluations={filteredEvaluations}
						setEvaluations={setEvaluations}
						searchedEvaluations={searchedEvaluations}
					/>
				)}
			</div>*/}
			<ImportingBox />
		</div>
	);
}
export default Grades;

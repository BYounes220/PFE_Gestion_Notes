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
	const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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
		<div className={`w-screen flex flex-col justify-between bg-white`}>
			<GradesHeader
				setSearchedEvaluations={setSearchedEvaluations}
				evaluations={filteredEvaluations} // Pass only filtered evaluations
				elementName={element}
			/>
			<Navbar setElement={setElement} />
			{element ? (
				<div className="overflow-y-auto flex-grow bg-gradient-to-r from-yellow-100 to-yellow-200 w-11/12 m-auto mt-5 mb-5 shadow-lg rounded-lg">
					{element && (
						<Evaluations
							evaluations={
								searchedEvaluations.length > 0
									? searchedEvaluations
									: filteredEvaluations
							}
							setEvaluations={setEvaluations}
							setSearchedEvaluations={setSearchedEvaluations}
						/>
					)}
				</div>
			) : null}

			{element && (
				<>
					<ImportingBox />
					<div className="footer bg-blue-700 w-screen h-32 mt-10 ml-0 mr-0 text-white flex justify-between items-center text-l font-medium">
						<p className="ml-10">
							© <span>{currentYear}</span> Academic Portal. All rights reserved.
						</p>
						<div className="mr-10">
							<a href="" className="mr-10 hover:text-yellow-400 transition-all duration-500">
								Policy
							</a>
							<a href="" className="mr-10 hover:text-yellow-400 transition-all duration-500">
								Policy
							</a>
							<a href="" className="mr-10 hover:text-yellow-400 transition-all duration-500">
								Policy
							</a>
						</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Grades;

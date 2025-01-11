import { useState } from "react";
import Navbar from "../../components/Grades/Navbar";
import GradesHeader from "../../components/Grades/GradesHeader";
import Evaluations from "../../components/Grades/Evaluations";
function Grades() {
	//this the name of the selected element in the navbar
	const [elementName, setElement] = useState("");
	const [searchedEvaluations, setSearchedEvaluations] = useState([]);
	return (
		<div className={`w-screen flex flex-wrap h-screen`}>
			<GradesHeader setSearchedEvaluations={setSearchedEvaluations} />
			<div className={`flex flex-row w-screen`}>
				<Navbar setElement={setElement} />
				<div className="overflow-y-auto flex-grow">
					<Evaluations />
				</div>
			</div>
		</div>
	);
}

export default Grades;

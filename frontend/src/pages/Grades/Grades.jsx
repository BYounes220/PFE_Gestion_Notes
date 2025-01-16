import { useState, useEffect } from "react";
import Navbar from "../../components/Grades/Navbar";
import GradesHeader from "../../components/Grades/GradesHeader";
import Evaluations from "../../components/Grades/Evaluations";
import FilterBox from "../../components/Grades/FilterBox";
function Grades() {
	//this the name of the selected element in the navbar
	const [elementName, setElement] = useState("");
	const [searchedEvaluations, setSearchedEvaluations] = useState([]);
	const [evaluations, setEvaluations] = useState([]);
	const [filter, setFilter] = useState(false);

	return (
		<div className={`w-screen flex flex-wrap h-screen bg-[#A2D2FF]`}>
			<GradesHeader
				setSearchedEvaluations={setSearchedEvaluations}
				evaluations={evaluations}
				elementName={elementName}
				filter={filter}
				setFilter={setFilter}
			/>
			<div className={`flex flex-row w-screen relative `}>
				<Navbar setElement={setElement} />
				<div className="overflow-y-auto flex-grow bg-[#A2D2FF] shadow-lg rounded-lg">
					{filter ? <FilterBox /> : null}
					<Evaluations
						evaluations={evaluations}
						setEvaluations={setEvaluations}
						searchedEvaluations={searchedEvaluations}
					/>
				</div>
			</div>
		</div>
	);
}

export default Grades;

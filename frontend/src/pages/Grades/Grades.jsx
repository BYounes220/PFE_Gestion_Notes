import { useState, useEffect, useMemo } from "react";
import Navbar from "../../components/Grades/Navbar";
import GradesHeader from "../../components/Grades/GradesHeader";
import Evaluations from "../../components/Grades/Evaluations";
import api from "../../api"; 

function Grades() {
	//this the name of the selected element in the navbar
	const [elementName, setElement] = useState("");
	const [searchedEvaluations, setSearchedEvaluations] = useState([]);
	const [evaluations, setEvaluations] = useState([]);
	const [filter, setFilter] = useState(false);
	const [allEvaluations, setAllEvaluations] = useState([]);

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
    return elementName
      ? evaluations.filter(
          (evaluation) => evaluation.nom_element === elementName
        )
      : [];
  }, [elementName, evaluations]);

  

  return (
    <div className={`w-screen flex flex-wrap h-screen bg-[#A2D2FF]`}>
      <GradesHeader
        setSearchedEvaluations={setSearchedEvaluations}
        evaluations={filteredEvaluations}
        elementName={elementName}
      />
      <div className={`flex flex-row w-screen`}>
        <Navbar setElement={setElement} />
        <div className="overflow-y-auto flex-grow bg-[#A2D2FF] shadow-lg rounded-lg">
          {elementName && (
            <Evaluations
              evaluations={filteredEvaluations}
              setEvaluations={setEvaluations}
              searchedEvaluations={searchedEvaluations}
            />
          )}
        </div>
      </div>
    </div>
  );
}
export default Grades;

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
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);


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
		<div className="w-screen min-h-screen bg-white relative">
		{/* Sidebar Toggle Button */}
		<button
		  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
		  className={`fixed z-50 bg-blue-600 h-10 w-10 flex justify-center items-center text-white p-2 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 ${
			isSidebarOpen ? 'left-64' : 'left-4'
		  }`}
		  style={{ top: '20px' }}
		>
		  <i className={`fas fa-chevron-${isSidebarOpen ? 'left' : 'right'} text-lg w-4`}></i>
		</button>
  
		{/* Left Sidebar Overlay */}
		<div
		  className={`w-64 bg-gradient-to-b from-blue-600 to-blue-700 shadow-xl p-4 border-r-2 border-blue-500 flex flex-col
			fixed h-screen transition-all duration-300 z-40 ${
			  isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
			}`}
		>
		  <div className="flex-1">
			<div className="flex items-center gap-2 mb-8 pl-2">
			  <i className="fas fa-graduation-cap text-white text-2xl"></i>
			  <h2 className="text-white font-bold text-xl">Services</h2>
			</div>
  
			<nav className="space-y-2">
			  {[
				{ name: "Supervision de PFE", icon:"fa-solid fa-users-rectangle", link: "#" },
				{ name: "Supervision de Stage", icon: "fa-solid fa-briefcase", link: "#" },
				/* { name: "Emplois", icon: "calendar", link: "#" },
				{ name: "Absences", icon: "user-clock", link: "#" },
				{ name: "Documents", icon: "folder-open", link: "#" },
				{ name: "Messages", icon: "envelope", link: "#" }, */
			  ].map((service, index) => (
				<a
				  key={index}
				  href={service.link}
				  className="flex items-center gap-3 px-4 py-3 text-white rounded-lg
							hover:bg-blue-500 transition-all duration-300
							group hover:shadow-md"
				>
				  <i className={`fas fa-${service.icon} mr-2 text-blue-200 group-hover:text-white`}></i>
				  <span className="font-medium">{service.name}</span>
				</a>
			  ))}
			</nav>
		  </div>
  
		  {/* User Profile Section */}
		  {/* <div className="pt-4 border-t border-blue-500">
			<div className="flex items-center gap-3 text-white pb-4">
			  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
				<i className="fas fa-user text-lg"></i>
			  </div>
			  <div>
				<p className="font-medium">John Doe</p>
				<p className="text-xs text-blue-200">Enseignant</p>
			  </div>
			</div>
		  </div>
		  */}
		</div> 
  
		{/* Main Content (Unaffected by sidebar) */}
		<div className="w-full h-full">
		  <GradesHeader
			setSearchedEvaluations={setSearchedEvaluations}
			evaluations={filteredEvaluations}
			elementName={element}
			showUploadButton={true}
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
  
		  {element && <ImportingBox element={element} evaluations={evaluations} />}
  
		  {/* Footer */}
		  
		</div>
	  </div>
  
	);
}

export default Grades;

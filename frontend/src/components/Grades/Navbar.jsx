import React, { useState, useEffect } from "react";
import api from "../../api";

function Navbar({ setElement }) {
	const [elements, setElements] = useState([]);
	const [selectedElement, setSelectedElement] = useState(-1);

	useEffect(() => {
		const getElements = async () => {
			try {
				const response = await api.get("/Grades/elements/");
				if (Array.isArray(response.data)) {
					setElements(response.data);
				}
			} catch (error) {
				console.log("Error fetching teacher elements:", error);
			}
		};
		getElements();
	}, []);

	const selectElement = (elementName, index) => {
		setElement(elementName.nom_element);
		setSelectedElement(index);
	};

	return (
		<div className="h-screen w-[250px] bg-gradient-to-b from-amber-400 to-amber-300 shadow-lg">
			<div className="p-4">
				<h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 border-amber-500 pb-2">
					Mes Éléments
				</h2>
				<div className="space-y-2 max-h-[calc(100vh-100px)] overflow-y-auto custom-scrollbar">
					{elements.length === 0 ? (
						<div className="text-gray-600 text-center py-4">
							Aucun élément trouvé
						</div>
					) : (
						elements.map((e, index) => (
							<div
								key={e.id}
								onClick={() => selectElement(e, index)}
								className={`
                  ${
						selectedElement === index
							? "bg-blue-600 text-white shadow-md transform scale-102"
							: "bg-white text-gray-800 hover:bg-blue-50"
					}
                  p-3 rounded-lg transition-all duration-200 ease-in-out
                  cursor-pointer font-medium capitalize
                  border border-transparent hover:border-blue-200
                  hover:shadow-md
                `}
							>
								{e.nom_element}
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

// Add custom scrollbar styles
const style = document.createElement("style");
style.textContent = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.4);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;
document.head.appendChild(style);

export default Navbar;

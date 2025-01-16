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
				console.log("error in importing the data");
			}
		};
		getElements();
	}, []);

	const selectElement = (elementName, index) => {
		setElement(elementName);
		setSelectedElement(index);
	};

	return (
		<>
			<div className="h-screen w-[200px] bg-[#8ECAE6] text-[#023047] p-1 flex shadow-sm shadow-amber-400 border-t border-[#A9D0F5]">
				<div className="m-1 w-full overflow-y-auto">
					<ul className="p-1">
						<h2 className="mb-3  text-2xl font-semibold font-serif text-center">
							Les élements
						</h2>
						{elements.map((e, index) => (
							<li
								onClick={() => selectElement(e, index)}
								className={`${
									selectedElement === index
										? "bg-blue-500 text-white"
										: ""
								} m-1 p-1 border-b text-xl font-serif capitalize hover:bg-blue-500 hover:text-white overflow-x-auto `}
							>
								{e.nom_element}
							</li>
						))}
					</ul>
				</div>
			</div>
		</>
	);
}

export default Navbar;

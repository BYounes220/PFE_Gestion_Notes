import React, { useState, useEffect } from "react";
import api from "../../api";

function Navbar({ setElement }) {
	const [elements, setElements] = useState([]);

	useEffect(() => {
		const getElements = async () => {
			try {
				const response = await api.get("/Grades/elements/");
				if (Array.isArray(response.data)) {
					setElements(response.data);
				} else setElements([response.data]);
			} catch (error) {
				console.log("Error fetching teacher elements:", error);
			}
		};
		getElements();
	}, []);

	const handleChange = (e) => {
		if (e.target.value !== "none") setElement(e.target.value);
	};

	return (
		<div className="h-24 rounded-lg p-1 pl-5 pr-5 w-11/12 m-auto mt-5 flex justify-center items-center bg-blue-200 shadow-lg shadow-blue-200 hover:scale-105 duration-500 ">
			<select
				className="h-12 w-full rounded-md pl-2 border-blue-400 border-2 "
				onChange={handleChange}
			>
				<option value="none">Choisir l'élement</option>
				{elements.map((v, i) => (
					<option
						key={i}
						value={v}
						className="focus:bg-blue-500 text-lg font-semibold"
					>
						{v.nom_element}
					</option>
				))}
			</select>
		</div>
	);
}

export default Navbar;

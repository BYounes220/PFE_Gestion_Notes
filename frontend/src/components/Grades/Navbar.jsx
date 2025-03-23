import React, { useState, useEffect } from "react";
import api from "../../api";
import icon from "../../assets/university.png";
import books from "../../assets/books.png";

function Navbar({ setElement }) {
	const [elements, setElements] = useState([]);

	useEffect(() => {
		const getElements = async () => {
			try {
				const response = await api.get("/Grades/elements/");
				console.log("Fetched elements:", response.data);
				//console.log(response.data.length);
				if (Array.isArray(response.data)) {
					setElements(response.data);
				} else {
					console.error("Unexpected response format:", response.data);
					setElements([response.data]);
				}
			} catch (error) {
				console.error("Error fetching teacher elements:", error);
			}
		};
		getElements();
	}, []);

	const handleChange = (e) => {
		if (e.target.value !== "none") {
			console.log("Selected element:", e.target.value);
			setElement(e.target.value);
		} else {
			setElement("");
		}
	};

	return (
		<div className="h-72 rounded-lg p-1 pl-5 pr-5 w-2/3 m-auto mt-7 flex flex-col justify-center items-center hover:scale-105 bg-gradient-to-r from-blue-100 to-blue-200 shadow-lg shadow-blue-100 duration-500 ">
			<div className="flex flex-row m-auto">
				<img
					src={icon}
					alt="university hat"
					className="w-14 h-16 mr-1"
				></img>
				<div className="flex flex-col items-center justify-center">
					<h1 className="font-bold text-3xl">
						Bienvenue dans la Gestion des Notes
					</h1>
					<h2>
						Sélectionnez une matière pour afficher et gérer les
						notes des étudiants
					</h2>
				</div>
			</div>
			<select
				className="h-12 w-11/12 rounded-md pl-2 border-blue-400 border-2"
				onChange={handleChange}
			>
				<option value="none">Choisir l'élement</option>
				{elements.map((v, i) => (
					<option
						key={i}
						value={v.nom_element}
						className="focus:bg-blue-500 text-lg font-semibold rounded-sm"
					>
						{v.nom_element}
					</option>
				))}
			</select>
			<div className="flex flex-col m-auto">
				<div className="flex m-auto">
					<img
						src={books}
						alt="university hat"
						className="w-6 h-6 mr-1"
					></img>
					<p className="font-bold">
						Gérez les notes des étudiants efficacement
					</p>
				</div>
				<p>
					Vous pouvez afficher, modifier et exporter les notes après
					avoir sélectionné une matière
				</p>
			</div>
		</div>
	);
}

export default Navbar;

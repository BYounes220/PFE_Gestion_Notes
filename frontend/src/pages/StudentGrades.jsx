import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GradesHeader from "../components/Grades/GradesHeader";
import api from "../api";
export default function StudentGrades() {
	const [semesters, setSemesters] = useState([]);
	const [pickedSemester, setSemester] = useState("");
	const [studentSemesterGrades, setGrades] = useState();
	const [average, setAverage] = useState(14);
	const [modules, setModules] = useState([]);
	const [modulesNumber, setModulesNumber] = useState(0);

	useEffect(() => {
		const fetchSemesters = async () => {
			try {
				const res = await api.get("/Grades/listOfSemesters/");
				console.log(res.data);
				let data = Array.isArray(res.data) ? res.data : [res.data];
				setSemesters(data);
			} catch (error) {
				console.log("semesters fetching error");
			}
		};
		fetchSemesters();
	}, []);

	useEffect(() => {
		//the bloc below allow us to define an async function and execute it immiediatly
		(async () => {
			try {
				if (pickedSemester == "") return;
				let data = { id_semestre: pickedSemester };
				console.log(data);
				const res = await api.post(
					"/Grades/semesterStudentGrades/",
					data
				);
				data = Array.isArray(res.data) ? res.data : [res.data];
				setModules(data);
			} catch (error) {
				console.log(
					"error in requeting the models of the picked semester from the backend "
				);
			}
		})();
	}, [pickedSemester]);

	const handleSelectChange = (e) => {
		let val = e.target.value;
		setSemester(val);
		const sem = semesters.find((s) => s.id_semestre == val);
		console.log(sem);
	};

	// Animation variants for the grades box
	const gradesBoxVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	// Animation variants for the average box
	const averageBoxVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: { opacity: 1, scale: 1 },
	};

	const ElementGradesBox = ({ name, note, result }) => {
		return (
			<motion.div
				className="flex flex-col md:flex-row w-11/12 md:h-[90px] h-auto gap-3 bg-white shadow-lg md:items-center p-4 md:p-6 rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl border border-gray-100"
				variants={gradesBoxVariants}
				initial="hidden"
				animate="visible"
				transition={{ duration: 0.3 }}
			>
				<h1 className="font-bold text-lg md:text-xl text-gray-800">
					{name}
				</h1>
				<div className="flex flex-col md:flex-row gap-2 md:ml-auto">
					<div
						className={`w-full ${
							note === "NaN" ? "md:w-48" : "md:w-40"
						} h-10 rounded-2xl bg-gray-100 p-2 flex items-center justify-center gap-5`}
					>
						<div className="text-gray-600 whitespace-nowrap">
							{note === "NaN" ? (
								<span className="text-gray-900 font-bold italic text-sm">
									Note non disponible
								</span>
							) : (
								<>
									Note:
									<span className="text-gray-900 font-bold pl-4">
										{note}/20
									</span>
								</>
							)}
						</div>
					</div>
					{/* Conditionally render the result box only if note is not "NaN" */}
					{note !== "NaN" &&
						(result === "VAL" ? (
							<div className="w-full md:w-20 h-10 rounded-xl bg-green-100 p-2 flex items-center justify-center">
								<div className="text-green-600 font-bold">
									{result}
								</div>
							</div>
						) : result === "NV" ? (
							<div className="w-full md:w-20 h-10 rounded-xl bg-red-100 p-2 flex items-center justify-center">
								<div className="text-red-600 font-bold">
									{result}
								</div>
							</div>
						) : null)}
				</div>
			</motion.div>
		);
	};

	const AverageBox = ({ average }) => {
		return (
			<motion.div
				className="flex flex-col md:flex-row w-11/12 md:h-[90px] h-auto gap-3 bg-gradient-to-r from-blue-500 to-orange-400 shadow-lg md:items-center p-6 md:p-8 rounded-xl transition-transform transform hover:scale-105 hover:shadow-xl"
				variants={averageBoxVariants}
				initial="hidden"
				animate="visible"
				transition={{ duration: 0.3, delay: 0.2 }}
			>
				<h1 className="font-bold text-xl md:text-2xl text-white">
					Moyenne Semestre
				</h1>
				<div className="flex gap-2 md:ml-auto font-bold text-xl md:text-2xl text-white">
					{average}/20
				</div>
			</motion.div>
		);
	};

	return (
		<div className="flex flex-col gap-5 md:gap-7 min-h-screen w-screen items-center bg-gray-50 p-4 md:p-0">
			<GradesHeader />
			<div className="flex flex-col gap-4 p-6 md:p-8 w-full md:w-11/12 mb-6 md:mb-10 h-auto md:h-[220px] bg-gradient-to-r from-blue-500 to-orange-400 rounded-lg shadow-2xl transition-transform transform hover:scale-102 hover:shadow-2xl">
				<p className="font-bold text-white text-center text-2xl md:text-3xl">
					Résultats Scolaires
				</p>
				<p className="text-center text-white text-sm md:text-lg lg:w-2/3 mx-auto">
					Sélectionnez un semestre pour consulter vos résultats
					scolaires.
				</p>
				<select
					className="h-12 w-full md:w-[452px] rounded-2xl mx-auto pl-4 bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 font-medium"
					onChange={handleSelectChange}
				>
					<option value="">Sélectionner Semestre</option>
					{semesters &&
						semesters.map((v, index) => (
							<option key={index} value={v.id_semestre}>
								{v.nom_semestre}
							</option>
						))}
				</select>
			</div>

			{!pickedSemester && (
				<motion.div
					className="w-full flex flex-col items-center gap-4 mb-5"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<div className="w-11/12 p-6 bg-white rounded-lg shadow-lg text-center">
						<p className="text-gray-800 text-lg font-semibold">
							📚 Bienvenue sur votre Tableau de Bord des Résultats
						</p>
						<p className="text-gray-600 mt-2">
							Sélectionnez un semestre ci-dessus pour afficher vos
							résultats détaillés.
						</p>
					</div>

					{/* Skeleton Loading Placeholder */}
					<div className="w-11/12 p-6 bg-white rounded-lg shadow-lg">
						<div className="animate-pulse flex flex-col gap-4">
							<div className="h-6 bg-gray-200 rounded w-1/2"></div>
							<div className="h-10 bg-gray-200 rounded"></div>
							<div className="h-10 bg-gray-200 rounded"></div>
							<div className="h-10 bg-gray-200 rounded"></div>
						</div>
					</div>
				</motion.div>
			)}

			<AnimatePresence>
				{pickedSemester && (
					<motion.div
						className="w-full flex flex-col items-center gap-4 mb-5"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
					>
						{modules.map((v, i) => (
							<ElementGradesBox
								name={v.nom_module}
								note={v.note}
								result={v.note >= 12 ? "VAL" : "NV"}
							/>
						))}
						{!isNaN(average) && <AverageBox average={average} />}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}

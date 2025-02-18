import GradesHeader from "../components/Grades/GradesHeader";
import teacherLogo from "../assets/teacher.png";
import { useState } from "react";
import fourSqLogo from "../assets/fourSquares.png";
import GroupPfeLogo from "../assets/user.png";
import briefCaseLogo from "../assets/briefcase.png";
import clipBoardLogo from "../assets/clipboard.png";
import { useNavigate } from "react-router-dom";

function TeacherHome() {
	const [btnClicked, setClicked] = useState(false);
	const navigate = useNavigate();
	const handleClick = () => {
		setClicked(true);
	};

	const StatisticCard = ({ logo, Title, Num }) => {
		return (
			<div className="bg-white lg:w-[400px] lg:h-[150px] md:w-[317px] rounded-lg shadow-xl p-6 transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105">
				<div>
					<img
						src={logo}
						alt="four squares logo"
						className="w-7 h-7 mb-2"
					></img>
					<p className="font-semibold mb-2 text-lg">{Title}</p>
					<p className="font-semibold text-3xl">{Num}</p>
				</div>
			</div>
		);
	};
	const GateCard = ({ logo, Title, Subtext, bg, func }) => {
		return (
			<div
				className={`${bg} lg:w-[400px] lg:h-[210px] md:w-[317px] rounded-lg shadow-xl p-6 transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105 `}
				onClick={func}
			>
				<div className="mt-3">
					<img
						src={logo}
						alt="four squares logo"
						className="w-7 h-7 mb-2 ml-auto mr-auto"
					></img>
					<p className="font-semibold mb-2 text-center text-xl text-white">
						{Title}
					</p>
					<p className="text-center text-white ">{Subtext}</p>
				</div>
			</div>
		);
	};

	return (
		<>
			{!btnClicked ? (
				<div className="flex flex-col gap-6 justify-center bg-gray-50 items-center">
					<GradesHeader></GradesHeader>
					<div className="flex flex-col gap-2 p-8 lg:w-11/12 mb-10 w-10/12 h-[700px] sm:h-[500px] bg-gradient-to-r from-yellow-400 via-blue-500 to-orange-500 rounded-lg shadow-2xl ">
						<div className="w-full h-1/3 ">
							<img
								src={teacherLogo}
								alt="teacherLogo"
								className="m-auto w-32 h-32 rounded-full border-4 border-white hover:border-yellow-400 transition-all duration-300 ease-in-out shadow-md"
							></img>
						</div>
						<p className="font-bold text-white text-center text-2xl">
							Bienvenue, Professeur ! Votre portail académique
							vous attend
						</p>
						<p className="text-center text-white lg:w-2/3 ml-auto mr-auto text-lg">
							En tant que professeur, vous avez accès à des outils
							complets pour gérer vos responsabilités académiques.
							Vous pouvez superviser les projets des étudiants,
							gérer les notes et suivre les stages, le tout en un
							seul endroit. Notre plateforme simplifie vos tâches
							administratives pour que vous puissiez vous
							concentrer sur ce qui compte le plus :
							l'enseignement.
						</p>
						<button
							className="rounded-3xl bg-white w-[226px] h-[50px] m-auto hover:bg-slate-200 hover:scale-105 font-semibold text-blue-600 transition-all duration-300 ease-in-out shadow-md"
							onClick={handleClick}
						>
							Continuez vers les services
						</button>
					</div>
					{/* <div className="footer bg-blue-700 w-screen h-32 mb-0 text-white flex justify-between items-center text-l font-medium">
						<p className="ml-10">
							© <span>{new Date().getFullYear()}</span> Academic
							Portal. All rights reserved.
						</p>
						<div className="mr-10">
							<a
								href=""
								className="mr-10 hover:text-yellow-400 transition-all duration-500"
							>
								Policy
							</a>
							<a
								href=""
								className="mr-10 hover:text-yellow-400 transition-all duration-500"
							>
								Policy
							</a>
							<a
								href=""
								className="mr-10 hover:text-yellow-400 transition-all duration-500"
							>
								Policy
							</a>
						</div>
					</div> */} 
				</div>
			) : (
				<div className="flex flex-col gap-6  items-center w-screen  min-h-screen bg-gray-50">
					<GradesHeader></GradesHeader>
					<div className="flex flex-col justify-center gap-6 w-screen">
						<div className="flex flex-col sm:flex-row gap-6 justify-center w-screen min-h-40 pl-4 pr-4 cursor-pointer">
							<StatisticCard
								logo={fourSqLogo}
								Title={"Matières enseignées"}
								Num={4}
							></StatisticCard>
							<StatisticCard
								logo={GroupPfeLogo}
								Title={"Groupes de PFE"}
								Num={4}
							></StatisticCard>
							<StatisticCard
								logo={briefCaseLogo}
								Title={"Stages supervisés"}
								Num={8}
							></StatisticCard>
						</div>
						<div className="flex flex-col sm:flex-row gap-6 justify-center w-screen min-h-56 pl-4 pr-4 cursor-pointer">
							<GateCard
								logo={clipBoardLogo}
								Title={"Gestion des notes"}
								Subtext={
									"Gérer et mettre à jour les notes des étudiants pour vos matières"
								}
								bg={
									"bg-gradient-to-r from-yellow-400 to-orange-500"
								}
								func={() => {
									navigate("/professors/grades");
								}}
							></GateCard>
							<GateCard
								logo={GroupPfeLogo}
								Title={"Supervision de PFE"}
								Subtext={
									"Voir et attribuer les sujets des groupes"
								}
								bg={
									"bg-gradient-to-r from-green-400 to-green-700"
								}
							></GateCard>
							<GateCard
								logo={briefCaseLogo}
								Title={"Supervision de stage"}
								Subtext={
									"Suivre l'avancement des stages des étudiants et leurs rapports"
								}
								bg={
									"bg-gradient-to-r from-blue-400 to-blue-700"
								}
							></GateCard>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
export default TeacherHome;

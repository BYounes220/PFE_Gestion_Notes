import React from "react";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen bg-gray-100">
			<nav className="bg-blue-600 shadow-lg">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex justify-between items-center h-16">
						<h2 className="text-2xl font-bold text-white">
							Teacher Portal
						</h2>
						<div className="flex space-x-4">
							<button
								onClick={() => navigate("/fill-marks")}
								className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
							>
								Fill Marks
							</button>
							<button
								onClick={() => navigate("/student-list")}
								className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
							>
								Student List
							</button>
							<button
								onClick={() => navigate("/attendance")}
								className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
							>
								Attendance
							</button>
							<button
								onClick={() => navigate("/schedule")}
								className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
							>
								Schedule
							</button>
							<button
								onClick={() => navigate("/profile")}
								className="text-white hover:bg-blue-700 px-3 py-2 rounded-md text-sm font-medium"
							>
								My Profile
							</button>
							<button
								onClick={() => navigate("/logout")}
								className="bg-red-500 text-white hover:bg-red-600 px-3 py-2 rounded-md text-sm font-medium"
							>
								Logout
							</button>
						</div>
					</div>
				</div>
			</nav>

			<main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<h1 className="text-3xl font-bold text-gray-900 mb-8">
					Welcome, Teacher!
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div
						onClick={() => navigate("/fill-marks")}
						className="bg-blue-500 hover:bg-blue-600 p-6 rounded-lg shadow-md cursor-pointer transform transition hover:scale-105"
					>
						<svg
							className="w-8 h-8 text-white mb-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
							></path>
						</svg>
						<h3 className="text-xl font-bold text-white mb-2">
							Fill Marks
						</h3>
						<p className="text-white">
							Enter and manage student grades
						</p>
					</div>

					<div
						onClick={() => navigate("/student-list")}
						className="bg-orange-500 hover:bg-orange-600 p-6 rounded-lg shadow-md cursor-pointer transform transition hover:scale-105"
					>
						<svg
							className="w-8 h-8 text-white mb-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
							></path>
						</svg>
						<h3 className="text-xl font-bold text-white mb-2">
							Student List
						</h3>
						<p className="text-white">
							View and manage your students
						</p>
					</div>

					<div
						onClick={() => navigate("/attendance")}
						className="bg-yellow-500 hover:bg-yellow-600 p-6 rounded-lg shadow-md cursor-pointer transform transition hover:scale-105"
					>
						<svg
							className="w-8 h-8 text-white mb-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
							></path>
						</svg>
						<h3 className="text-xl font-bold text-white mb-2">
							Attendance
						</h3>
						<p className="text-white">
							Mark and track student attendance
						</p>
					</div>

					<div
						onClick={() => navigate("/schedule")}
						className="bg-gray-500 hover:bg-gray-600 p-6 rounded-lg shadow-md cursor-pointer transform transition hover:scale-105"
					>
						<svg
							className="w-8 h-8 text-white mb-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
							></path>
						</svg>
						<h3 className="text-xl font-bold text-white mb-2">
							Schedule
						</h3>
						<p className="text-white">
							View your teaching schedule
						</p>
					</div>

					<div
						onClick={() => navigate("/assignments")}
						className="bg-blue-500 hover:bg-blue-600 p-6 rounded-lg shadow-md cursor-pointer transform transition hover:scale-105"
					>
						<svg
							className="w-8 h-8 text-white mb-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
							></path>
						</svg>
						<h3 className="text-xl font-bold text-white mb-2">
							Assignments
						</h3>
						<p className="text-white">
							Create and manage assignments
						</p>
					</div>

					<div
						onClick={() => navigate("/reports")}
						className="bg-orange-500 hover:bg-orange-600 p-6 rounded-lg shadow-md cursor-pointer transform transition hover:scale-105"
					>
						<svg
							className="w-8 h-8 text-white mb-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
							></path>
						</svg>
						<h3 className="text-xl font-bold text-white mb-2">
							Reports
						</h3>
						<p className="text-white">
							Generate student performance reports
						</p>
					</div>
				</div>
			</main>
		</div>
	);
};

export default TeacherDashboard;

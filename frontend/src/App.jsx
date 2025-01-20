import { useState } from "react";
import "./App.css";
import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Protected from "./components/auth/Protected";
import Login from "./pages/auth/Login";
import Grades from "./pages/Grades/Grades";
import Home from "./pages/Home";
import Evaluations from "./components/Grades/Evaluations";
import TeacherDashboard from "./pages/Grades/TeacherDashboard";
function App() {
	const [count, setCount] = useState(0);

	function Logout() {
		localStorage.clear();
		return <Navigate to="/login" />;
	}

	function RegisterAndLogout() {
		localStorage.clear();
		return <Register />;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path="/professors/grades"
					element={
						<Protected>
							<Grades />
						</Protected>
					}
				/>
				<Route
					path="/evaluations"
					element={
						<Protected>
							<Evaluations />
						</Protected>
					}
				/>
				<Route
					path="/"
					element={
						<Protected>
							<Home />
						</Protected>
					}
				/>
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/register" element={<RegisterAndLogout />} />
				<Route path="/prof" element={TeacherDashboard} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

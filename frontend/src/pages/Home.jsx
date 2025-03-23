import StudentGrades from "./StudentGrades";
import TeacherHome from "./TeacherHome";
import { useState } from "react";
function Home() {
	const [authenticatedUser, setUser] = useState("student"); //the value is set as student just so as to debug things
	return authenticatedUser !== "student" ? (
		<TeacherHome></TeacherHome>
	) : (
		<StudentGrades></StudentGrades>
	);
}

export default Home;

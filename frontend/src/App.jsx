import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Evaluations from "./components/Grades/Evaluations";
import './index.css';


function App() {
    return (
        <>
            <Evaluations/>
        </>
    );
}

export default App;
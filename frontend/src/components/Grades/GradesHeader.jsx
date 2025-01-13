import { useState } from "react";
import searchIcon from "../../assets/icons8-search.svg";
import LOGO_EST from "../../assets/LOGO_EST.png";
import api from "../../api";
import Evaluations from "./Evaluations";

function GradesHeader({ setSearchedEvaluations, evaluations }) {
	const [query, setQuery] = useState("");
	const [uploading, setUploading] = useState(false);
	const [file, setFile] = useState(null);

	const search = async (event) => {
		event.preventDefault();
		evaluations.forEach((element) => {
			if (element.etudiant === query) {
				setSearchedEvaluations([element]);
			}
		});
	};
	const load = () => {
		const reader = new FileReader();

		reader.onload = (e) => {
			console.log(e.target.result);
		};

		reader.readAsText(file);
	};

	return (
		<>
			<div
				className={`w-full p-1 flex flex-row h-20 bg-gray-200 border-t border-[#A9D0F5]`}
			>
				<img
					src={LOGO_EST}
					alt="image"
					className="w-auto h-auto scale-95"
				/>
				<button
					className={`m-3 w-32 h-12 rounded-md text-gray-800 font-serif font-bold text-xl hover:bg-gray-300`}
				>
					Home
				</button>
				<button
					className={`m-3 w-32 text-gray-800 rounded-lg font-serif font-bold  text-xl hover:bg-gray-300`}
					onClick={() => setUploading(true)}
				>
					upload
				</button>
				<div className={`${uploading ? "" : "hidden"}`}>
					<input
						placeholder="upload"
						type="file"
						className={`m-5 `}
						value={file}
						onChange={(inp) => {
							setFile(inp.target.value);
							load();
						}}
					/>
				</div>
				<form
					className="flex bg-white m-2 mt-3 h-9 place-self-center ml-auto rounded-md"
					onSubmit={search}
				>
					<input
						placeholder="cne"
						className={`h-9  w-64 rounded-md pl-1 focus:outline-none focus:shadow-green-500 focus:shadow-sm`}
						name="queryValue"
						value={query}
						onChange={(newQuery) => setQuery(newQuery.target.value)}
					/>
					<button
						className={`h-9 w-10 flex justify-center items-center`}
						type="submit"
					>
						<img
							src={searchIcon}
							alt="Search Icon"
							className="w-5 h-5"
						/>
					</button>
				</form>
			</div>
		</>
	);
}
export default GradesHeader;
